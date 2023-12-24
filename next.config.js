/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "decocanva.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "edu-consulting-szkolenia.pl",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
