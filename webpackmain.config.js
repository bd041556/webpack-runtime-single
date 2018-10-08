const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src/client', 'main.js'),
  output: {
    path: path.resolve(__dirname, "lib/dist"),
    filename: "main.bundle.js",
  },
  devtool: false,
  stats: "errors-only",
  optimization: {
    nodeEnv: "production"
  },
  externals: {
    '../library/library' : 'commonjs2 ./library.node.js'
  }
};

