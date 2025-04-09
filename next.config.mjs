/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'images.pexels.com',           // Existing allowed domain
        'maps.googleapis.com'          // Allow Google Static Maps
      ],
    },
  };
  
  export default nextConfig;
  