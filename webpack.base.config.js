var path = require("path"),
    fs = require('fs')

var SRC_PATH = path.join(__dirname, 'src'),
    DIST_PATH = path.join(__dirname, './dist/'),
    pageStr = __dirname + '/src/js/pages/';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var entries = {};
fs.readdirSync(pageStr).filter(function (folder) { //遍历pages
    var path = pageStr + folder;
    var stat = fs.lstatSync(path);
    if (stat.isDirectory()) {
        fs.readdirSync(path).filter(function (name) {
            var c_path = path + '/' + name;
            var jsName = name.substring(0, name.lastIndexOf('.'));
            entries['pages/' + folder + '/' + jsName] = c_path;
        });
    }
});
console.log(entries)
module.exports = {
    entry: entries,
    output: {
        path: DIST_PATH,
        publicPath: '/dist/',
        filename: "js/[name].js"
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        },
        extensions: [".less", ".css", ".js", ".vue", ".json"],
        modules: ["node_modules", 'D:\\node_modules_ats\\']
    },
    resolveLoader: {
        modules: ["node_modules", 'D:\\node_modules_ats\\']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [SRC_PATH]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'autoprefixer-loader',
                    options: {
                        browsers: 'not ie <= 8',
                        add: true
                    }
                }],
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    use: ['css-loader', 'sass-loader', {
                        loader: 'autoprefixer-loader',
                        options: {
                            browsers: 'not ie <= 8',
                            add: true
                        }
                    }]
                })
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: 'images/[name].[ext]'
                }
            },

            {
                test: /\.(eot|woff|woff2|ttf|svg)/,
                loader: "url-loader",
                options: {
                    limit: 100,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    }
}
