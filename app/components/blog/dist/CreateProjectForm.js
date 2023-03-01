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
var useColors_1 = require("../../hooks/useColors");
function CreateProjectForm(props) {
    var primaryStyles = useColors_1.useColors().primaryStyles;
    var focusTrapRef = hooks_1.useFocusTrap();
    return (React.createElement(core_1.TextInput, __assign({ ref: focusTrapRef, minLength: 5, maxLength: 60, icon: React.createElement(icons_1.IconNewSection, { size: 36, stroke: 1.5 }), radius: "xl", size: "xl", rightSection: React.createElement(core_1.ActionIcon, { loading: !!props.isloading, type: "submit", "aria-label": 'Создать новый проект', mr: 18, mt: 0, size: 46, radius: "xl", variant: "filled", style: __assign({}, primaryStyles) },
            React.createElement(icons_1.IconPlus, { size: 26, stroke: 1.5 })), "aria-label": 'Название нового проекта', placeholder: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u0411\u043B\u043E\u0433\u0430", rightSectionWidth: 42 }, props)));
}
exports["default"] = CreateProjectForm;
