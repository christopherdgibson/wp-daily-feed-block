const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: {
        'daily-feed-block/index': './src/daily-feed-block/index.js',
        'daily-feed-block/view': './src/daily-feed-block/view.js',
    }
};
