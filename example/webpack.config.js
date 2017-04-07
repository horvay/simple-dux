// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./app.tsx",
    output: {
        filename: "simple-dux-example.js",
        path: __dirname + "/dist/"
    },
    // plugins: [new BundleAnalyzerPlugin()],
    // Enable sourcemaps for debugging webpack's output.
    //todo: do we still need this now that we have it as a rule?
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        },{
            test: /\.js$/,
            loader: "source-map-loader"
        }],
    }
};
