const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "static/[name].[hash].js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 제외 대상
        use: ["babel-loader"] // 바닐라 스크립트로 변경
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // CSS가 추출되지 않으면 loader가 실행된다.
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                // @import(ed) 리소스에 css-loader를 적용하기 전 로더를 구성한다.
                importLoaders: 1
              }
            },
            {
              // css-loader 전에 PostCSS이 실행되어 압축(minify)하고 CSS 룰을 적용하고
              // 자동 전처리(autoprefixer)를 실행한다.
              // 자동 전처리 단계에서 최신 브라우저 2 사양을 사용한다.
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
        })
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  plugins: [
    // 템플릿 및 favicon 설정
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    // 'styles' 디렉터리 내 스타일시트를 생성한다.
    new ExtractTextPlugin({
      filename: "styles/styles.[hash].css",
      allChunks: true
    })
  ]
};
