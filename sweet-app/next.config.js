/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  images: {
    unoptimized: true  // 对于静态导出需要禁用图片优化
  },
  // 如果部署到子路径，需要设置 basePath
  // basePath: '/your-repo-name'
}

module.exports = nextConfig
