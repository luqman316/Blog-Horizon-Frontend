// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: [
//       "workoscdn.com",
//       "images.pexels.com",
//       // yahan aur bhi domains add kar sakte hain
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['workoscdn.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "workoscdn.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      // yahan aur bhi domains add kar sakte hain
    ],
  },
};

export default nextConfig;
