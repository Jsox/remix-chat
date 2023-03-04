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
exports.__esModule = true;
var core_1 = require("@mantine/core");
var hooks_1 = require("@mantine/hooks");
var icons_1 = require("@tabler/icons");
var useColors_1 = require("app/hooks/useColors");
var useStyles = core_1.createStyles(function (theme) { return ({
    wrapper: {
        position: 'relative',
        paddingTop: 60,
        paddingBottom: 60,
        '@media (max-width: 755px)': {
            paddingTop: 40,
            paddingBottom: 40
        }
    },
    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xl,
        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left'
        }
    },
    text: {
        fontFamily: "sans-serif, " + theme.fontFamily,
        columnGap: 40,
        color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[9],
        fontSize: theme.fontSizes.lg,
        columnRule: "1px solid " + (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]),
        MozColumnGap: 40,
        MozColumnRule: "1px dotted " + (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]),
        WebkitColumnGap: 40,
        WebkitColumnRule: "1px dotted " + (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]),
        textAlign: 'justify',
        '@media (max-width: 755px)': {
            fontSize: theme.fontSizes.md
        },
        // '@media (min-width: 1400px)': {
        //     fontSize: theme.fontSizes.md,
        //     columnCount: 3,
        //     mozColumnCount: 3,
        //     webkitColumnCount: 3,
        // },
        '@media (min-width: 1900px)': {
            fontSize: theme.fontSizes.lg
        },
        '& h3, h2, h4': {
            letterSpacing: -1,
            color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
    }
}); });
function Article(props) {
    var gradientTitleColor = useColors_1.useColors().gradientTitleColor;
    var classes = useStyles().classes;
    var title = props.title, html = props.html, height = props.height;
    var _a = hooks_1.useElementSize(), ref = _a.ref, width = _a.width;
    var columns = width < 755 ? 1 : width > 1200 ? 3 : 2;
    var style = {
        columnCount: columns,
        MozColumnCount: columns,
        WebkitColumnCount: columns
    };
    var content = (React.createElement(core_1.TypographyStylesProvider, null,
        React.createElement(core_1.Text, { style: __assign({}, style), ref: ref, className: classes.text },
            React.createElement("div", { dangerouslySetInnerHTML: { __html: html } }))));
    return (React.createElement(core_1.Container, { className: classes.wrapper, size: 'xl' },
        React.createElement(React.Fragment, null,
            React.createElement(core_1.Divider, { label: React.createElement(React.Fragment, null,
                    React.createElement(icons_1.IconArticle, { size: 12 }),
                    React.createElement(core_1.Box, { fs: 'md', mx: 5 }, "\u0441\u0442\u0430\u0442\u044C\u044F \u043F\u043E \u0442\u0435\u043C\u0435")), labelPosition: "center", mb: 'xl' }),
            React.createElement(core_1.Title, { gradient: gradientTitleColor, variant: 'gradient', order: 2, size: 2, className: classes.title }, title),
            height && (React.createElement(core_1.Spoiler, { maxHeight: height, showLabel: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435", hideLabel: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C" }, content)),
            !height && content)));
}
exports["default"] = Article;
