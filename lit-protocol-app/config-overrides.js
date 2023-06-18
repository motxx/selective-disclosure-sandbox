const rewired = require('react-app-rewired');

module.exports = {
  // 開発サーバーのカスタマイズポイント
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      // デフォルト設定の開発サーバーを作成する
      const config = configFunction(proxy, allowedHost);
      // この辺でカスタマイズする
      return config;
    };
  },
  // `npm test`のカスタマイズポイント
  jest: function (config) {
    // この辺でカスタマイズする
    return config;
  },
  // webpack.configのカスタマイズポイント
  webpack: function (config, env) {
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    };
    return config;
  },
};
