module.exports = {
    entry: "./index.jsx",
    output: {
        path: process.cwd() + "/client",
        publicPath: "/client/",
        filename: "client.js"
    },
    module: {
        rules: [{
                test: /\.(jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"]
                    }
                }
            }, {
                test: /.sass$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                  ]
            }, {
                test: /.(css)$/,
                use: ["style-loader", "css-loader"]
            }
            // ,{
            //     test:/.(js)$/,
            //     use:{
            //         loader:"babel-loader",
            //         options:{
            //             presets:"@babel/env"
            //         }
            //     }
            // }
        ]
    },
    optimization: {
        minimize: false
    },
    devServer: {
        port: 4000
    }
}