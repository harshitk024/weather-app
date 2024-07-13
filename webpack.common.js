const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry : "./src/index.js",

    module:{
      rules:[
        {
          test: /\.css$/i,
          use: [
            {
            loader: MiniCssExtractPlugin.loader,
            },
            'css-loader']
        }
      ]
    },

    plugins: [new CleanWebpackPlugin(),new HTMLPlugin({
        template: "./src/index.html"
    }),new MiniCssExtractPlugin({filename:`[name].css`,chunkFilename:`[id].css`})]

}