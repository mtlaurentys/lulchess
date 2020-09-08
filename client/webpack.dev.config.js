var path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "out"),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname),
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
}
