var path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        app: './src/app/App.js',
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [' ', '.jsx', '.scss', '.js', '.json', '.css'],
        modules: [
            path.resolve(__dirname + '/src/app'),
            'node_modules',
        ],
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
            },
            {
                test: /(\.scss|\.css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        })
    ]
};