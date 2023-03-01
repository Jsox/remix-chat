/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ['**/.*'],
    serverDependenciesToBundle: ['chatgpt', 'p-timeout', 'quick-lru'],
    appDirectory: 'app',
    serverMinify: true,
    // assetsBuildDirectory: 'public/build',
    // serverBuildPath: 'build/index.js',
    // publicPath: '/build/',
    future: {
        v2_routeConvention: true,
    },
};
