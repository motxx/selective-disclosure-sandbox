const path = require("path");

module.exports = {
  entry: "./src/verifyzk.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
