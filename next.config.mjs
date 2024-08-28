/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
      GCP_PLACES_KEY : process.env.GCP_PLACES_KEY,
    }
}

export default nextConfig;
