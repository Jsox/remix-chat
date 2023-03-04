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
exports.HeroText = void 0;
var core_1 = require("@mantine/core");
var Dots_1 = require("./Dots");
var useStyles = core_1.createStyles(function (theme) { return ({
    wrapper: {
        position: 'relative',
        paddingTop: 60,
        paddingBottom: 30,
        '@media (max-width: 755px)': {
            paddingTop: 30,
            paddingBottom: 30
        }
    },
    inner: {
        position: 'relative',
        zIndex: 1
    },
    dots: {
        position: 'absolute',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        '@media (max-width: 755px)': {
            display: 'none'
        }
    },
    dotsLeft: {
        left: 0,
        top: 0
    },
    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 40,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        '@media (max-width: 520px)': {
            fontSize: 28
        }
    },
    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 9]
    },
    description: {
        textAlign: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[8],
        '@media (max-width: 520px)': {
            fontSize: theme.fontSizes.md
        }
    },
    controls: {
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width: 520px)': {
            flexDirection: 'column'
        }
    },
    control: {
        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md
        },
        '@media (max-width: 520px)': {
            height: 42,
            fontSize: theme.fontSizes.md,
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0
            }
        }
    }
}); });
function HeroText(opts) {
    var titleStart = opts.titleStart, titleEnd = opts.titleEnd, titleHighlighted = opts.titleHighlighted, description = opts.description, _a = opts.controls, controls = _a === void 0 ? null : _a, props = __rest(opts, ["titleStart", "titleEnd", "titleHighlighted", "description", "controls"]);
    var classes = useStyles().classes;
    return (React.createElement(core_1.Container, { className: classes.wrapper, size: 1400 },
        React.createElement(Dots_1.Dots, { className: classes.dots, style: { left: 0, top: 0 } }),
        React.createElement(Dots_1.Dots, { className: classes.dots, style: { left: 60, top: 0 } }),
        React.createElement(Dots_1.Dots, { className: classes.dots, style: { left: 0, top: 140 } }),
        React.createElement(Dots_1.Dots, { className: classes.dots, style: { right: 0, top: 60 } }),
        React.createElement("div", __assign({ className: classes.inner }, props),
            React.createElement(core_1.Title, { className: classes.title },
                titleStart,
                ' ',
                React.createElement(core_1.Text, { component: "span", className: classes.highlight, inherit: true }, titleHighlighted),
                ' ',
                titleEnd),
            React.createElement(core_1.Container, { p: 0, size: 800 },
                React.createElement(core_1.Text, { size: "lg", color: "dimmed", className: classes.description }, description)),
            controls && React.createElement("div", { className: classes.controls }, controls))));
}
exports.HeroText = HeroText;
