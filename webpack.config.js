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
            {
                test: /\.(js|jsx)$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/react',
                        {'plugins': ['@babel/plugin-proposal-class-properties']}
                    ]
                }
            },
            {test: /\.scss$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]},
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
