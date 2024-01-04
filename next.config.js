/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3000',
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v1',
    DB_URI: '',

    NEXTAUTH_URL: 'http://localhost:3000',

    NEXTAUTH_SECRET: 'GPMhNX3tDKnvCMEFJevsNhPwRpxseju4lN0+pT/czf8='
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  reactStrictMode: false
};

module.exports = nextConfig;
