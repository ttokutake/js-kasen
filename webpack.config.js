const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  output: {
    library: "Kasen",
    libraryTarget: "umd",
    globalObject: "this", // TODO: Remove this workaround
    filename: "kasen.js"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  }
};
