
// import { createStylesServer, ServerStyles } from '@mantine/ssr';

var Fingerprint = require('express-fingerprint')

const path = require("path");
const {
    createServer
} = require("http");
const fs = require("fs");

const express = require("express");
// const {
//     Server
// } = require("socket.io");
const compression = require("compression");
const morgan = require("morgan");
const {
    createRequestHandler
} = require("@remix-run/express");

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

if (!fs.existsSync(BUILD_DIR)) {
    console.warn(
        "Build directory doesn't exist, please run `npm run dev` or `npm run build` before starting the server."
    );
}

const app = express();

// You need to create the HTTP server from the Express app
const httpServer = createServer(app);

app.use(compression());

// You may want to be more aggressive with this caching
app.use(express.static("public", {
    maxAge: "1y"
}));

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", {
    immutable: true,
    maxAge: "1y"
}));

app.use(Fingerprint())

app.use(morgan("tiny"));

app.all(
    "*",
    MODE === "production" ?
        createRequestHandler({
            build: require("./build"),
            getLoadContext: (req, res, next) => {
                console.log({ fingerprint: req.fingerprint })
                return {
                    fingerprint: req.fingerprint.hash
                }
            },
        }) :
        (req, res, next) => {
            purgeRequireCache();
            const build = require("./build");
            return createRequestHandler({
                build,
                getLoadContext: (req, res, next) => {
                    
                    return {
                        fingerprint: req?.fingerprint.hash
                    }
                },
                mode: MODE
            })(req, res, next);
        }
);

const port = process.env.PORT || 3000;

// instead of running listen on the Express app, do it on the HTTP server
httpServer.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});


function purgeRequireCache() {
    // purge require cache on requests for "server side HMR" this won't let
    // you have in-memory objects between requests in development,
    // alternatively you can set up nodemon/pm2-dev to restart the server on
    // file changes, we prefer the DX of this though, so we've included it
    // for you by default
    for (const key in require.cache) {
        if (key.startsWith(BUILD_DIR)) {
            delete require.cache[key];
        }
    }
}