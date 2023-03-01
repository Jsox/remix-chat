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
exports.CheckboxCard = void 0;
var core_1 = require("@mantine/core");
var hooks_1 = require("@mantine/hooks");
var useStyles = core_1.createStyles(function (theme) { return ({
    button: {
        display: 'flex',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0],
        width: '100%',
        border: "1px solid " + (theme.colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[3]),
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        transition: 'all 0.3s ease',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[6] : theme.colors.darkBlue[2],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[1]
        }
    }
}); });
function CheckboxCard(_a) {
    var checked = _a.checked, defaultChecked = _a.defaultChecked, onChange = _a.onChange, title = _a.title, description = _a.description, className = _a.className, others = __rest(_a, ["checked", "defaultChecked", "onChange", "title", "description", "className"]);
    var _b = useStyles(), classes = _b.classes, cx = _b.cx;
    var _c = hooks_1.useUncontrolled({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange: onChange
    }), value = _c[0], handleChange = _c[1];
    return (React.createElement(core_1.UnstyledButton, __assign({}, others, { onClick: function () { return handleChange(!value); }, className: cx(classes.button, className) }),
        React.createElement(core_1.Checkbox, { checked: value, onChange: function () { }, tabIndex: -1, size: "md", mr: "xl", styles: {
                input: { cursor: 'pointer' }
            } }),
        React.createElement("div", null,
            React.createElement(core_1.Text, { weight: 500, mb: 7, sx: { lineHeight: 1 } }, title),
            React.createElement(core_1.Text, { size: "sm", color: "dimmed" }, description))));
}
exports.CheckboxCard = CheckboxCard;
