const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CompressionPlugin = require("compression-webpack-plugin"),

    isProduction = process.argv.indexOf('-p') !== -1; // Check if we are in production mode

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        'global': APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: 'nethloader.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/i,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader?modules=true&localIdentName=[name]__[local]',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: isProduction ? '' : 'source-map',
    devServer: {
        contentBase: APP_DIR,
        compress: true,
        historyApiFallback: true,
        stats: 'minimal',
        hot: true,
        inline: true
    },
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    plugins: [
      isProduction ? new CompressionPlugin() : new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        minify: {
          collapseWhitespace: true,
        },
        hash: true,
        template: APP_DIR + '/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
        }
      })
    ],
};
