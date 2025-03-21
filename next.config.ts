import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['bcrypt', '@mapbox/node-pre-gyp', 'mock-aws-s3'],
  webpack: (config) => {
    // HTMLファイルを無視するための設定
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader'
    });
    
    // Node.jsのコアモジュールをブラウザで使用できるようにする
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      path: false,
      os: false
    };
    
    // bcryptモジュールをクライアントバンドルから除外
    if (!config.externals) {
      config.externals = [];
    }
    
    if (Array.isArray(config.externals)) {
      config.externals.push('bcrypt');
    }
    
    return config;
  }
};

export default nextConfig;
