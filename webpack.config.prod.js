/* eslint-disable */
// TerserPlugin is used to minify the bundle
const TerserPlugin = require('terser-webpack-plugin');

const createBaseConfig = require('./webpack.config.base.js');
const webpackConfigBase = createBaseConfig({
	isMinified: true,
	webpackEnv: 'production',
	includeTypeChecker: false,
});

const mainConfig = Object.assign({}, webpackConfigBase, {
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						reserved: ['$super'],
					},
					output: {
						ecma: 5,
						comments: false,
						// Turned on because emoji and regex is not minified properly using default
						ascii_only: true,
					},
				},
			}),
		],
		runTimeChunk: {
			name: (entrypoint) => `runtime-${entrypoint.name}`,
		},
	},
	plugins: [...webpackConfigBase.plugins],
});

module.exports = mainConfig;