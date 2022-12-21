const path = require("path");

module.exports = {
  entry: "./src/core/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "simplehtmllayout.js",
    library: {
      name: "simplehtmllayout",
      type: "umd",
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
