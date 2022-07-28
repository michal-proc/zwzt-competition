const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = [
    {
        mode: "development",
        entry: './js/frontend/main.js',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
        output: {
            path: path.resolve(__dirname, './static/build/js/frontend'),
            filename: 'frontend.bundle.js'
        }
    },
    {
        mode: "development",
        entry: './js/admin/main.js',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
        output: {
            path: path.resolve(__dirname, './static/build/js/admin'),
            filename: 'admin.bundle.js'
        }
    }
];