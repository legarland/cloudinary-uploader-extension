const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/**/*", to: "./", flatten: true, ignore: ["index.js"] }
    ])
  ],
  node: {
    fs: "empty"
  },
  watch: true
};
