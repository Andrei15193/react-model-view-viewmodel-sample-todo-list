const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve("src", "app.tsx"),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Todo App with MVVM",
            hash: true,
            inject: false,
            scriptLoading: 'blocking',
            meta: {
                charset: 'utf-8'
            },
            templateContent: function ({ htmlWebpackPlugin }) {
                return `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta charset="utf-8">
    ${htmlWebpackPlugin.tags.headTags}
    <title>${htmlWebpackPlugin.options.title}</title>
</head>
<body>
    <div id="app"></div>
    ${htmlWebpackPlugin.tags.bodyTags}
</body>
</html>`;
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true
    },
};