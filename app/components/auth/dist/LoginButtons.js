"use strict";
exports.__esModule = true;
var core_1 = require("@mantine/core");
var react_1 = require("@remix-run/react");
var SocialButtons_1 = require("../SocialButtons/SocialButtons");
function LoginButtons() {
    return (React.createElement(core_1.Flex, { direction: 'column', mb: 0 },
        React.createElement(core_1.Divider, { label: "\u0412\u043E\u0439\u0442\u0438 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E", labelPosition: "center", my: "xs" }),
        React.createElement(core_1.Group, { grow: true, my: "xs" },
            React.createElement(react_1.Form, { action: "/auth/github", method: "post" },
                React.createElement(SocialButtons_1.GithubButton, { w: '100%', radius: "xl", type: "submit", "aria-label": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E Github" }, "Github")),
            React.createElement(react_1.Form, { action: "/auth/google", method: "post" },
                React.createElement(SocialButtons_1.GoogleButton, { w: '100%', radius: "xl", type: "submit", "aria-label": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E Google" }, "Google")))));
}
exports["default"] = LoginButtons;
