var webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            //在这里引入 manifest 文件
            manifest: require('./dist/js/vendor-manifest.json')
        }),
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

        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            warnings: false
        })
    ]

})

console.log("initializing webpack production build....");
