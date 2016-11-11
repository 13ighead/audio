/**
 * @file webpack.dev.config.js
 * @author Bighead
 */

var webpack = require('webpack');

module.exports = {
    entry: {
        './demo/index': './demo/index.js'
    },
    output: {
        path: __dirname,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        new webpack.ProvidePlugin({
            $: 'zepto'
        })
    ]
};
