/* eslint-disable */
const createBaseConfig = require('./webpack.config.base.js');
const webpackConfigBase = createBaseConfig({
	isMinified: false,
	webpackEnv: 'development',
	includeTypeChecker: false,
});

const mainConfig = Object.assign({}, webpackConfigBase, {
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [...webpackConfigBase.plugins],
});

module.exports = mainConfig;