const webpack = require('webpack');
const path = require('path');

function resolve (dir) {
    let p = path.resolve(__dirname, '..', dir);
    return p;
}

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    target: 'node',

    entry: {
        index: resolve('./entry/index.js')
    },
    output: {//输出目录
        path:  path.resolve( './dist'),
        filename: '[name].js',
        publicPath: path.resolve('/'),
        library: 'pkg_name',
        libraryTarget: 'commonjs2'
    },
    externals: {

    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};