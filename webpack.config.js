var path = require('path');

module.exports = {

    // entry: path.resolve(__dirname, './app/src/index.js'),
    entry: "./src/index.js",
    output: { 
        path: path.resolve(__dirname, './app/dist/'),
        // publicPath: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js', 
    },  
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'main.js'
//   },
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
