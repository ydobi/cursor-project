module.exports = {
  // 启用压缩
  compress: true,

  // 配置 webpack
  webpack: (config) => {
    // 优化生产环境构建
    config.optimization = {
      ...config.optimization,
      minimize: true
    }
    return config
  }
}
