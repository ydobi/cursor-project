import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true  // 对于静态导出需要禁用图片优化
  }
};

export default nextConfig;
