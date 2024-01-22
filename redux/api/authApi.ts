import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    register: builder.mutation({
      query(body) {
        //we will get 'body' from our component
        return {
          url: '/auth/register',
          method: 'POST',
          body
        };
      }
    })
  })
});

export const { useRegisterMutation } = authApi;
