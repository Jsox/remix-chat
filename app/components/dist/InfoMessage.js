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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var core_1 = require("@mantine/core");
var icons_1 = require("@tabler/icons");
function InfoMessage(_a) {
    var text = _a.text, _b = _a.textAuthor, textAuthor = _b === void 0 ? '' : _b, _c = _a.icon, icon = _c === void 0 ? React.createElement(icons_1.IconAlertTriangle, { size: "2rem" }) : _c, others = __rest(_a, ["text", "textAuthor", "icon"]);
    return (React.createElement(core_1.Paper, __assign({ p: 'md', withBorder: true, radius: 'lg', my: 'xl' }, others),
        React.createElement(core_1.Blockquote, { color: 'primary', cite: textAuthor, icon: icon }, text)));
}
exports["default"] = InfoMessage;
