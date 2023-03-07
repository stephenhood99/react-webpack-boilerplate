/* eslint-disable */
'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
	'js',
	'ts',
	'tsx',
	'json',
];

module.exports = {
	appNodeModules: resolveApp('node_modules'),
	appTsConfig: resolveApp('tsconfig.json'),
	appSrc: resolveApp('src'),
	appPath: resolveApp('.'),
	appBuild: resolveApp('dist'),
	testsSetup: resolveApp('test'),
	appPublic: resolveApp('ui/static'),
	moduleFileExtensions,
};