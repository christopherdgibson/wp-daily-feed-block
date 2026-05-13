const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'daily-feed-block/index': './src/daily-feed-block/index.js',
        'daily-feed-block/view': './src/daily-feed-block/view.js',
    },
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@components': path.resolve(__dirname, 'src/daily-feed-block/components'),
            '@daily-feed-block': path.resolve(__dirname, 'src/daily-feed-block')
        },
    },
};

//MiniCssExtractPlugin for proper css execution?
