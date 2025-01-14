/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          domains: ['cdn.sanity.io',"images.unsplash.com", "cdn.pixabay.com",'shorturl.at','tinyurl.com','i.imghippo.com'],
        }, 
        env: {
          EMAIL_USER: process.env.EMAIL_USER,
          EMAIL_PASS: process.env.EMAIL_PASS,
          SHOP_OWNER_EMAIL: process.env.SHOP_OWNER_EMAIL,
        },
};

export default nextConfig;
