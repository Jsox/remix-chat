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
var NavbarSearch_1 = require("./../components/NavbarSearch/NavbarSearch");
var HeaderAction_1 = require("./../components/HeaderAction/HeaderAction");
var links_1 = require("../data/links");
var useColors_1 = require("../hooks/useColors");
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var useBreakpoint_1 = require("../hooks/useBreakpoint");
function Layout(props) {
    var _a = react_2.useOutletContext() || {}, _b = _a.navBarLinksAddon, navBarLinksAddon = _b === void 0 ? [] : _b, _c = _a.aside, aside = _c === void 0 ? [] : _c, user = _a.user;
    var bodyStyles = useColors_1.useColors().bodyStyles;
    var _d = hooks_1.useDisclosure(false), opened = _d[0], toggle = _d[1].toggle;
    var _e = hooks_1.useScrollLock(), scrollLocked = _e[0], setScrollLocked = _e[1];
    var newNavBarLinks = links_1.navBarLinks.concat(navBarLinksAddon);
    var smallerLg = useBreakpoint_1["default"]().smallerLg;
    react_1.useEffect(function () {
        setScrollLocked(opened);
    }, [opened]);
    var asideContent = Array.isArray(aside) ? aside.map(function (c, i) { return React.createElement("div", { key: i }, c); }) : null;
    return (React.createElement(core_1.AppShell, { styles: {
            main: __assign({}, bodyStyles)
        }, navbarOffsetBreakpoint: "md", asideOffsetBreakpoint: "lg", navbar: React.createElement(NavbarSearch_1.NavbarSearch, { navBarLinks: newNavBarLinks, addons: smallerLg ? asideContent : null, user: user, opened: opened, toggle: toggle }), aside: React.createElement(core_1.MediaQuery, { smallerThan: 'lg', styles: { display: 'none' } },
            React.createElement(core_1.Aside, { style: { background: 'transparent' }, p: "md", width: { lg: 250, xl: 300 } },
                React.createElement(core_1.ScrollArea, null, asideContent))), 
        // footer={<FooterLinks data={dataFooterLinks} />}
        header: HeaderAction_1.HeaderAction({ links: links_1.headerTopLinks.mainLinks, opened: opened, toggle: toggle }) }, props.children));
}
exports["default"] = Layout;
