const path = require('path');
const Dotenv = require('dotenv-webpack')
module.exports = {
    entry: './src/js/index.js',
    mode: "development",
    plugins: [
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/main/resources/static/assets/js/'),
    },
    devtool: "eval-cheap-source-map",
};