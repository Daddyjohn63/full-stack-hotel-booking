import dbConnect from '@/backend/config/dbConnect';
import User, { IUser } from '@/backend/models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

type Credentials = {
  email: string;
  password: string;
};

type Token = {
  user: IUser;
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await nextAuth(req, res, {
    session: {
      strategy: 'jwt'
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select('+password');
          //console.log('USER FROM ROUTE:', user);

          if (!user) {
            throw new Error('Invalid email or password');
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error('Invalid email or password');
          }
          return user;
          //returns a user object with _id, name, email, password (encrypted), role and date created.
        }
      })
    ],
    callbacks: {
      //is used when we create a JWT at sign-in
      jwt: async ({ token, user }) => {
        const jwtToken = token as Token;

        user && (token.user = user); //The line user && (token.user = user); is a conditional statement. It checks if user is truthy (i.e., it exists and is not null, undefined, or false). If true, it assigns the user object to a new property named user within the token object.

        if (req.url?.includes('/api/auth/session?update')) {
          //hit the database and return the updated user
          const updatedUser = await User.findById(jwtToken?.user._id);
          token.user = updatedUser;
        }

        return token;
      },

      //now add the token into the session
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        // console.log('session=>', session);

        //@ts-ignore
        delete session?.user?.password;

        return session;
      }
    },
    pages: {
      signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
  });
}

export { auth as GET, auth as POST };
