var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'development',
    // entry: path.resolve(__dirname, './app/src/index.js'),
    // entry: "./src/index.js",
    entry: {
        main: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',            
            "./src/index.js"        ],
        Vendor: "./src/js/Vendor.js"    
    },
    output: { 
        path: path.resolve(__dirname, './app/dist/'),
        path: path.join(__dirname, './app/dist'),
        publicPath: './app/dist',
        filename: '[name].js'
    },  
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'main.js'
//   },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
                }
            }
        }
        ]
    }
}
