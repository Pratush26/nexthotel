/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",   // ✅ Add this line
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;