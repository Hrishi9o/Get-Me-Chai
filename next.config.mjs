/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:3001',
        'localhost',
        '127.0.0.1:3000',
        '127.0.0.1',
        '10.153.165.178:3000',
        '10.153.165.178',
        'hrishishetty9o:3000',
        'hrishishetty9o',
        'api.razorpay.com',
        'checkout.razorpay.com',
        '*.razorpay.com',
        'rzp.io',
        '*.rzp.io',
        '192.168.*',
        '10.*',
        '172.*',
        '*.ngrok-free.app',
        '*.loca.lt',
      ],
    },
  },
};

export default nextConfig;
