//webpackconfig.js main app
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const isProduction = process.env.NODE_ENV === "production";
const appMetadata = {
  short_name: "React App",
  name: "Create React App Sample",
  icons: [
    {
      src: "favicon.ico",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/x-icon",
    },
    {
      src: "logo192.png",
      type: "image/png",
      sizes: "192x192",
    },
    {
      src: "logo512.png",
      type: "image/png",
      sizes: "512x512",
    },
  ],
  start_url: ".",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#ffffff",
};
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
      inject: true,
      favicon: "./public/favicon.ico", // Set favicon
      meta: {
        // Inject metadata
        ...appMetadata,
      },
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
