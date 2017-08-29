"use strict";
const webpack = require('webpack');
const path = require('path');
const env = require('./environments.config');

const nodeEnv = process.env.NODE_ENV || 'development';

const isProd = nodeEnv.trim() === 'production';

// console.log(nodeEnv.trim() === 'production');

const sourcePath = env.sourcePath,
    distPath = env.distPath,
    publicPath = env.publicPath;

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

//Подрубаем плагины
let plugins = [];

if (isProd) {
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }));

    /*******************************
     * Сжатие скриптов
     *******************************/
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
        },
        output: {
            comments: false
        }
    }));
}

//Добавление всех страниц
const fs = require('fs');

fs.readdirSync(env.sourcePath).forEach(file => {
    if (file.indexOf('.pug') !== -1) {
        plugins.push(new HtmlWebpackPlugin({
            inject: false,
            filename: file.replace('pug', 'html'),
            template: './' + file,
            hash: true
        }));
    }
});

plugins.push(new ExtractTextPlugin({filename: 'css/style.css', allChunks: true}));

/*
 * CommonsChunkPlugin
 * Объединяет сторонние библиотеки в отдельный файл, так же может объединять повторяющиеся фрагменты кода
 * docs - https://webpack.js.org/plugins/commons-chunk-plugin/
 */
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'node',
    minChunks: function (module) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
    }
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'manifest'}));
/*
 * DefinePlugin
 * Создает глобальную константу, которая доступна во время компиляции
 * docs - https://webpack.js.org/plugins/define-plugin/
 */
console.log(nodeEnv.trim());
plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(nodeEnv.trim())}
}));
plugins.push(new webpack.NamedModulesPlugin());

/*******************************
 * Прокидываем глобальные переменные
 ******************************/
plugins.push(new webpack.ProvidePlugin({
    'assign': 'lodash/assign',
    'isEmpty': 'lodash/isEmpty',
    'merge': 'lodash/merge',
    'React': 'react',
    'ReactDOM': 'react-dom'
}));

if (!isProd) {
    /*
     * HotModuleReplacementPlugin
     * Замена фрагментов кода без перезагрузки страницы
     */
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
} else {
    /*
     * CopyWebpackPlugin
     * Копирует файлы в директорию сборки
     * docs - https://github.com/kevlened/copy-webpack-plugin
     */
    plugins.push(new CopyWebpackPlugin([
        {from: sourcePath + '/img/*', to: distPath + '/'}
    ]));
}


module.exports = {
    // devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
        js: './js/index.app.js',
        vendor: [
            'react',
            'es6-promise',
            'babel-polyfill',
            'react-dom',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path: distPath,
        publicPath: publicPath,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /(\.css|\.less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('postcss-import')({root: loader.resourcePath}),
                                    require('autoprefixer')(),
                                    require('cssnano')({zindex: false})
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        name: 'css/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-runtime'],
                            presets: ['es2015', 'stage-0', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.(pug)$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, './src'),
            sourcePath
        ]
    },
    plugins,
    devServer: {
        contentBase: isProd ? './dist' : './src',
        historyApiFallback: true,
        port: 3001,
        host: "0.0.0.0",
        compress: isProd,
        inline: !isProd,
        hot: false,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    }
};