const webpack = require('webpack');
const path = require('path');

// const config = {
//     mode: "production",
//     entry: path.resolve(__dirname, "src") + "./app/assets/scritps/app.js",
//     // entry: "./app/assets/scritps/app.js",
//     output: { 
//         path: path.resolve(__dirname, "./app/temp/scripts"),
//         filename: "bundle.js"
//     }
// }

const config = {
    mode: 'production',
    
    entry: path.resolve(__dirname, './app/src/index.js'),
    // entry: "./app/assets/scritps/app.js",
    output: { 
        // path: paths.DIST, 
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js', 
    }
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 3000
      }
}
module.exports = config;

