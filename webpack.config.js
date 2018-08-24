const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,
  output: {
    library: "Kasen",
    libraryTarget: "commonjs2",
    filename: "kasen.js"
  }
};
