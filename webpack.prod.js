const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'cache-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /views/, /animejs/, /template/],
                use: [
                    {
                        loader: 'buble-loader',
                        options: {
                            objectAssign: 'Object.assign'
                        }
                    }
                ]
            }
        ]
    }
});