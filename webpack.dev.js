const webpack = require('webpack');
const path = require('path');
const AbsolutePathPlugin = require('./src/webpack/absolute-path');

module.exports = {
    mode: 'development',

    entry: __dirname + '/src/entry.js',

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'build/'
    },

    resolve: {
        extensions: ['*', '.js'],
        modules: ['./src/scripts', 'node_modules', './src/styles', './src/images', './src/video', './src/audio']
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: 'dist',
        publicPath: '',
        host: 'localhost',
        port: '8000',
        compress: false,
        hot: true,
        open: true,
    },

    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' }
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.webp|\.jpe?g|\.gif$|\.mp4$|\.webm$|\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },

    optimization: {
        // removeAvailableModules: false, // Если кодовая база разрослась, то раскомментить это
        // removeEmptyChunks: false, // Если кодовая база разрослась, то раскомментить это
        // splitChunks: false, // Если кодовая база разрослась, то раскомментить это
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new AbsolutePathPlugin({
            dirname: __dirname
        })
    ]
};
