const path = require("path");

module.exports = {
  entry: './src/core/index.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simplehtmllayout.js',
    library: {
      name: 'simplehtmllayout',
      type: 'umd',
    },
  },
};
