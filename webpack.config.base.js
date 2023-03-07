/* eslint-disable */
const path = require('path');
const paths = require('./config/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Source maps 
const shouldUseSourceMap = (process.env.GENERATE_SOURCEMAP = false);

const cssRegex = /\.css$/;
const lessRegex = /\.less$/;

module.exports = function ({
	isMinified = false,
	webpackEnv = 'production',
} = {}) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';
	process.env.BABEL_ENV = webpackEnv;

	function getAppStyleLoaders() {
		return [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: {
						localIdentName: '[local]___[hash:base64:15]',
					},
				},
			},
			{
				loader: 'less-loader',
			}
		];
	}

	const config = {
		mode: isEnvProduction
			? 'production'
			: isEnvDevelopment && 'development',
		devtool: isEnvProduction
			? shouldUseSourceMap
				? 'source-map'
				: false
			: isEnvDevelopment && 'eval-source-map',
		// compiling for browser environment (as opposed to node)
		target: 'web',

		// Where the app starts executing and webpack starts bundling
		entry: {
			index: [
				'./src/index.tsx',
			].filter(Boolean),
		},

		module: {
			rules: [
				{
					test: /\.(js|ts|tsx)$/,
					include: [paths.appSrc],
					loader: require.resolve('babel-loader'),
					options: {
						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
						cacheCompression: false,
						compact: isEnvProduction,
					}
				},
				// Node modules that need to be babelified. None yet
				// {
				//	 test: /\.(js|ts|tsx)$/,
				//	 include: [],
				//	 loader: require.resolve('babel-loader'),
				//	 options: {
				//		 cacheDirectory: true,
				//		 cacheCompression: false,
				//	 }
				// },
				{
					test: lessRegex,
					include: [/node_modules\//],
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'less-loader',
							options: {
								lessOptions: {
									paths: [
										paths.appNodeModules,
									],
								},
							},
						},
					],
					sideEffects: true,
				},
				// Handle styles unique to our app
				{
					test: /\.(le|c)ss$/,
					exclude: [/node_modules\//],
					use: getAppStyleLoaders(),
				},
				// If we use jquery
				// {
				//	 test: require.resolve('jquery'),
				//	 loader: 'expose-loader',
				//	 options: {
				//		 exposes: [{
				//			 globalName: 'jQuery',
				//			 override: true,
				//		 },
				//		 {
				//			 globalName: '$',
				//			 override: true,
				//		 }],
				//	 },
				// },
				{
					test: /\.(png|svg|jpe?g|gif)$/,
					type: 'asset/resource',
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: isEnvProduction,
							},
						},
					],
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				}
			}),
		].filter(Boolean),
		devServer: {
			compress: true,
			host: '0.0.0.0',
			hot: true,
			allowedHosts: 'all',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
			},
			port: 3000,
		},
		resolve: {
			// When paths aren't relative or absolute, check the following directories as a fallback
			modules: ['node_modules', '.', 'src', __dirname],
			// root: path.resolve(__dirname, 'src'),
			// If a file doesn't have an extension, try these extensions
			extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
			alias: {
				react: [
					path.resolve(__dirname, 'node_modules/react'),
				]
			},
		}
	}

	return config;
};

// module.exports = {
//	 entry: {
//		 index: [
//			 './src/index.tsx',
//		 ].filter(Boolean),
//	 },
//	 module: {
//		 rules: [
//			 {
//				 test: /\.less$/i,
//				 use: [
//					 // compiles Less to CSS
//					 "style-loader",
//					 "css-loader",
//					 "less-loader",
//				 ],
//			 },
//		 ],
//	 },
// };