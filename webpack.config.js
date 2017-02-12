module.exports = {
	entry: ['./app/myJS.js'],
	output: {
		path: __dirname + '/build',
		filename: 'script.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},
	devServer: {
		port: 3000,
		contentBase: './build',
		inline: true
	}
}