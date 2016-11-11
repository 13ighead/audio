/**
 * @file webpack.config.js
 * @author Bighead
 */

var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    entry: {
        audio: __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'Player',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
