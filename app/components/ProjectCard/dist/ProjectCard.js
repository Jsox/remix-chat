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
exports.ProjectCard = void 0;
var core_1 = require("@mantine/core");
var react_1 = require("@remix-run/react");
var useStyles = core_1.createStyles(function (theme) { return ({
    button: {
        display: 'flex',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0],
        width: '100%',
        border: "1px solid " + (theme.colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[3]),
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        transition: 'all 0.3s ease',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[6] : theme.colors.darkBlue[0],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[1]
        }
    }
}); });
function ProjectCard(_a) {
    var title = _a.title, _b = _a.description, description = _b === void 0 ? null : _b, created = _a.created, url = _a.url, className = _a.className, others = __rest(_a, ["title", "description", "created", "url", "className"]);
    var _c = useStyles(), classes = _c.classes, cx = _c.cx;
    return (React.createElement(core_1.UnstyledButton, __assign({ "aria-label": 'Проект: ' + title, to: url, component: react_1.NavLink }, others, { className: cx(classes.button, className) }),
        React.createElement(core_1.Box, { w: '100%', tabIndex: -1, mr: "xl", styles: {
                input: { cursor: 'pointer' }
            } },
            React.createElement(core_1.Title, { align: "center", fw: 300, order: 3, size: 'h3', mb: 7, sx: { lineHeight: 1 } }, title),
            React.createElement("p", null, new Date(created).toLocaleDateString()),
            description && (React.createElement(core_1.Text, { size: "sm", color: "dimmed" }, description)))));
}
exports.ProjectCard = ProjectCard;
