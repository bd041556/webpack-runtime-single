const path = require("path");

module.exports = {
  mode: "development",
  entry: { "library": path.resolve(__dirname, 'src/library', 'library.js') },
  output: {
    path: path.resolve(__dirname, "lib/dist"),
    filename: '[name].node.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: false,
  target: "node",
  stats: "errors-only",
  optimization: {
    // create only one runtime chunk.
    runtimeChunk: "single",  // If this line is not commented out, it doesn't work. module.exports comes back as [ "library.js" ].
    splitChunks: {
      minSize: 0,
      chunks: "all"
    },
  },

};

