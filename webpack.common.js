const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack");

module.exports = {
    entry: {
        main: "./src/entry-point/index-landing-page.js",
        page_search_music: "./src/entry-point/index-search-music.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: `[name].js`
    },
    resolve: {
        alias: {
            style: path.resolve(__dirname, "src/style/SCSS")
        }
    },
    module: {
        rules: [
           {
                test: /\.scss$/,
                include: /main.scss/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
           },
           {
               test: [/SCSS/],
               exclude: [/main.scss/, /animejs/, /node_modules/],
               use: [
                    "sass-to-string",
                    {
                        loader: "sass-loader"
                    }
                ]
           },
           {
               test: /\.(png|jpg|jpeg)$/,
               exclude: [/node_modules/, /animejs/],
               use: [
                   {
                       loader: "file-loader"
                   },
                   {
                       loader: ImageminPlugin.loader,
                       options: {
                           bail: false,
                           cache: true,
                           imageminOptions: {
                               plugins: ["jpegtran", "optipng"]
                           }
                       }
                   }
               ]
           },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/source.html",
            filename: "index.html",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: "./src/music-search.html",
            filename: "music-search.html",
            chunks: ['page_search_music']
        }),
        new webpack.BannerPlugin({
            banner: "Special thanks to Webpack!",
        }),
        new webpack.ProgressPlugin((percentage, message, ...args) =>{
            console.log(`Processing... Current Progress: ${percentage * 100}, message: ${message}`);
        }),
    ]
}
