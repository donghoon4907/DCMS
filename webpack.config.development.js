const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const port = 3002;

module.exports = {
  // 환경 설정
  mode: "development", // development: 속도 및 개발자 경험에 최적화
  devtool: "inline-source-map", // 디버깅 설정
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: ["@babel/polyfill", "./src/index.js"], // 진입점 설정
  output: {
    filename: "bundle.[hash].js",
    publicPath: "/" // hot reloading은 중첩된 경로에서 동작하지 않도록 설정
  }, // 번들 파일명 설정 * hash: 캐싱관련
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 제외 대상
        use: ["babel-loader"] // 바닐라 스크립트로 변경
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: "last 2 versions"
                  }
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 템플릿 및 favicon 설정
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    // HMR 업데이트 시 터미널에 표기
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  devServer: {
    host: "localhost",
    compress: true,
    port,
    open: "Chrome", // 실행 브라우저 설정
    historyApiFallback: true,
    hot: true
  }
};
