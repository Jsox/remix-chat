/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ['**/.*'],
    serverDependenciesToBundle: ['chatgpt', 'p-timeout', 'quick-lru', 'express-fingerprint', 'dotenv'],
    appDirectory: 'app',
    serverMinify: true,
    serverBuildDirectory: "server/build",
    // assetsBuildDirectory: 'public/build',
    // serverBuildPath: 'build/index.js',
    // publicPath: '/build/',
    future: {
        v2_routeConvention: true,
        // unstable_postcss: true,
        // unstable_dev: true,
    },
};
