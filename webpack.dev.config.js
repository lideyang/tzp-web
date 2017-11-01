var webpack = require("webpack"),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config'),
    proxy = require("./proxy");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            //在这里引入 manifest 文件
            manifest: require('./dist/js/vendor-manifest.json')
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: './js/common.js',
            minChunks: 5
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        })

    ],
    devServer: {
        clientLogLevel: "none"
    }
})

console.log("initializing webpack developent build....");
