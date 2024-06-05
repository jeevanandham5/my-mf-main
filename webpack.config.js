//webpackconfig.js main app
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  entry: "./src/index.js",
  mode: isProduction ? "production" : "development",
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Content-Type": "application/manifest+json",
    },
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        oneOf: [
          // this matches module CSS files
          {
            test: /\.module\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[name]__[local]__[hash:base64:5]",
                  },
                },
              },
            ],
          },
          // this matches regular CSS files
          {
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        shop: isProduction
          ? "shop@https://my-mf-shop.vercel.app/remoteEntry.js"
          : "shop@http://localhost:3001/remoteEntry.js",
        dashboard: isProduction
          ? "dashboard@https://my-mf-dashboard.vercel.app/remoteEntry.js"
          : "dashboard@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,

          requiredVersion: require("./package.json").dependencies.react,
        },
        "react-dom": {
          singleton: true,

          requiredVersion: require("./package.json").dependencies["react-dom"],
        },
      },
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
  ],
  stats: "verbose",
};
