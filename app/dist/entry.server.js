"use strict";
exports.__esModule = true;
var server_1 = require("react-dom/server");
var react_1 = require("@remix-run/react");
var remix_1 = require("@mantine/remix");
var server = remix_1.createStylesServer();
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    // let user = authenticator.isAuthenticated(request);
    // remixContext.user = user;
    var markup = server_1.renderToString(React.createElement(react_1.RemixServer, { context: remixContext, url: request.url }));
    responseHeaders.set('Content-Type', 'text/html');
    return new Response("<!DOCTYPE html>" + remix_1.injectStyles(markup, server), {
        status: responseStatusCode,
        headers: responseHeaders
    });
}
exports["default"] = handleRequest;
