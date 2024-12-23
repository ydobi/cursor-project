import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    // 禁用缓存
    if (!dev) {
      config.cache = false
    }

    // 或者设置更小的缓存
    // config.cache = {
    //   type: 'filesystem',
    //   maxGenerations: 1,
    // }

    return config
  },
};

export default nextConfig;
