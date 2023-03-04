"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RootLayout = exports.CatchBoundary = exports.loader = exports.meta = void 0;
var node_1 = require("@remix-run/node");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var core_1 = require("@mantine/core");
var remix_1 = require("@mantine/remix");
var notifications_1 = require("@mantine/notifications");
var theme_1 = require("./theme");
var hooks_1 = require("@mantine/hooks");
var auth_server_1 = require("./services/auth.server");
var Layout_1 = require("./layouts/Layout");
var NothingFoundBackground_1 = require("./components/NothingFoundBackground/NothingFoundBackground");
var ServerError_1 = require("./components/ServerError/ServerError");
var ServerOverload_1 = require("./components/ServerOverload/ServerOverload");
var CustomFonts_1 = require("./fonts/CustomFonts");
exports.meta = function () { return ({
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1'
}); };
core_1.createEmotionCache({ key: 'mantine' });
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_server_1.authenticator.isAuthenticated(request)];
                case 1:
                    user = (_b.sent()) || null;
                    return [2 /*return*/, node_1.json({
                            userLoader: user
                        })];
            }
        });
    });
}
exports.loader = loader;
function CatchBoundary() {
    var caught = react_2.useCatch();
    switch (caught.status) {
        case 404:
            return (React.createElement(RootLayout, null,
                React.createElement(Layout_1["default"], null,
                    React.createElement(NothingFoundBackground_1.NothingFoundBackground, null))));
        case 500:
            return (React.createElement(RootLayout, null,
                React.createElement(Layout_1["default"], null,
                    React.createElement(ServerError_1.ServerError, null))));
        case 503:
            return (React.createElement(RootLayout, null,
                React.createElement(Layout_1["default"], null,
                    React.createElement(ServerOverload_1.ServerOverload, null))));
        default:
            break;
    }
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("title", null, "Oops!"),
            React.createElement(react_2.Meta, null),
            React.createElement(react_2.Links, null)),
        React.createElement("body", null,
            React.createElement("h1", null,
                caught.status,
                " ",
                caught.statusText),
            React.createElement(react_2.Scripts, null))));
}
exports.CatchBoundary = CatchBoundary;
function RootLayout(props) {
    var _a = hooks_1.useLocalStorage({
        key: 'color-scheme',
        defaultValue: 'dark'
    }), colorScheme = _a[0], setColorScheme = _a[1];
    var toggleColorScheme = function (value) {
        var current = value || colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(current);
    };
    return (React.createElement(core_1.ColorSchemeProvider, { colorScheme: colorScheme, toggleColorScheme: toggleColorScheme },
        React.createElement(core_1.MantineProvider, { theme: __assign({ colorScheme: colorScheme }, theme_1.theme), withGlobalStyles: true, withNormalizeCSS: true },
            React.createElement(CustomFonts_1.CustomFonts, null),
            React.createElement(notifications_1.NotificationsProvider, { position: "top-right", limit: 3 },
                React.createElement("html", { lang: "ru" },
                    React.createElement("head", null,
                        React.createElement(remix_1.StylesPlaceholder, null),
                        React.createElement(react_2.Meta, null),
                        React.createElement(react_2.Links, null)),
                    React.createElement("body", null,
                        props.children,
                        React.createElement(react_2.ScrollRestoration, null),
                        React.createElement(react_2.Scripts, null),
                        React.createElement(react_2.LiveReload, null)))))));
}
exports.RootLayout = RootLayout;
function App() {
    var userLoader = react_2.useLoaderData().userLoader;
    var _a = react_1.useState(userLoader), user = _a[0], setUser = _a[1];
    var _b = react_1.useState([]), navBarLinksAddon = _b[0], setNavBarLinksAddon = _b[1];
    var _c = react_1.useState([]), aside = _c[0], setAside = _c[1];
    return (React.createElement(RootLayout, null,
        React.createElement(react_2.Outlet, { context: { user: user, setUser: setUser, navBarLinksAddon: navBarLinksAddon, setNavBarLinksAddon: setNavBarLinksAddon, aside: aside, setAside: setAside } })));
}
exports["default"] = App;
