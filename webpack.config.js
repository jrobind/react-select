const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './examples/index.jsx'],
    output: {
        path: '/examples',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
        ]
    },
    devServer: {
        historyApiFallback: true  
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'examples/index.html',
            inject: false
        })
    ],
    mode: 'development'
} 
