import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true  // 对于静态导出需要禁用图片优化
  },
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
