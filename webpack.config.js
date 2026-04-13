const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    plugins: [
        ...defaultConfig.plugins,
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/daily-api-block/assets/css/dailyApi.css', to: './daily-api-block/dailyApi.css'},
                {from: 'src/daily-api-block/assets/css/calendar.css', to: './daily-api-block/calendar.css'}
            ]
        })
    ]
}