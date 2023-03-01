"use strict";
exports.__esModule = true;
var core_1 = require("@mantine/core");
var icons_1 = require("@tabler/icons");
function PageTitle(_a) {
    var title = _a.title;
    return (React.createElement(core_1.Group, { w: '100%', mt: 80, mb: 30, pt: 'xl', pb: 'sm' },
        React.createElement(icons_1.IconGripVertical, { width: '10%' }),
        React.createElement(core_1.Title, { w: '85%', gradient: { from: 'white', to: 'blue' }, variant: 'gradient', order: 2, size: 'h2', align: 'center', fw: 500 }, title)));
}
exports["default"] = PageTitle;
