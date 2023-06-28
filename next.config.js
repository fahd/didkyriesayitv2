/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {

  /**below is added to suppress initial fs module not found and child_process module not found error*/
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
        config.resolve.fallback.tls = false;
        config.resolve.fallback.net = false;
        config.resolve.fallback.dgram = false;
      }
  
      return config;
    },
    future: {
      webpack5: true,
    },
    fallback: {
      fs: false,
      tls: false,
      net: false,
      dgram: false,
    },
  images: {
    domains: ['didkyriesayit.s3.us-east-2.amazonaws.com']
  },
}

