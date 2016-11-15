var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
        './src/components/app.jsx',
        './src/style/style.scss'
    ],
    output: {
        path: path.join(__dirname, 'public/assets/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            },
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/
        },{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
        }]
    }
};
