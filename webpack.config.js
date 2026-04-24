const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    plugins: [
        ...defaultConfig.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/daily-feed-block/assets/css/dailyApi.css', to: './daily-feed-block/dailyApi.css'},
                {from: 'src/daily-feed-block/assets/css/calendar.css', to: './daily-feed-block/calendar.css'}
            ]
        })
    ]
}