const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
	entry: ['./src/client/index.js'],
	output: {
		path: path.resolve(__dirname, './dist/public'),
		filename: 'build.js',
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.js', '.vue', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.html$/,
				loader: 'vue-html-loader',
			},
			{
				test: /\.css$/,
				use: [
				  process.env.NODE_ENV !== 'production'
					? 'vue-style-loader'
					: MiniCssExtractPlugin.loader,
				  'css-loader'
				]
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new Dotenv(),
		new HtmlWebpackPlugin({
			filename: path.resolve(__dirname, './dist/public/index.html'),
			template: path.resolve(__dirname, './src/client/index.html'),
			inject: true,
		}),
		new MiniCssExtractPlugin({ filename: 'style.css' }),
	],
};

module.exports = config;
