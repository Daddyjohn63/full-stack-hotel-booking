/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:3000',
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit-v1',
    DB_URI: ''
  },
  reactStrictMode: false
};

module.exports = nextConfig;
