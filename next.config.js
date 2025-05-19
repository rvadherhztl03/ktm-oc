/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    images: {
      domains: ['fastly.picsum.photos', 'dummyimage.com','images.unsplash.com'],
    },
  }
  
  module.exports = nextConfig;

  // next.config.js
// module.exports = {  
//     images: {
//       // domains: ['picsum.photos'],
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'dummyimage.com',
//           port: '',
//           pathname: '/600x400/**',
//         },
        
//         // {
//         //   protocol: 'https',
//         //   hostname: '**.photos',
//         // },
//       ],
//     },
//   }