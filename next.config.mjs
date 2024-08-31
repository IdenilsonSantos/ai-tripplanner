/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
      GCP_PLACES_KEY : process.env.GCP_PLACES_KEY,
      GCP_AI_KEY : process.env.GCP_AI_KEY
    },
    images: {
      loader: 'default', // Use the default loader without restricting domains
      domains: ["*"],       // No specific domains, allowing any external URL
      unoptimized: true, // Disable image optimization for external URLs
    },
}

export default nextConfig;
