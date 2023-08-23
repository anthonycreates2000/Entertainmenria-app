const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");


module.exports = merge(common, {
    mode: "development",
    plugins:[
        new BundleAnalyzerPlugin(),
        new DuplicatePackageCheckerPlugin()
    ]
});