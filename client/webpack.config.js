var path = require('path');

module.exports = {
    entry: './src',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'nethloader.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/i,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './src'),
        compress: true,
        historyApiFallback: true
    }
};
