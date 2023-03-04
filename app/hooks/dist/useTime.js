"use strict";
exports.__esModule = true;
exports.useTime = void 0;
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
require("dayjs/locale/ru");
dayjs_1["default"].locale('ru');
dayjs_1["default"].extend(relativeTime_1["default"]);
function useTime(dateString) {
    return {
        fromNow: dayjs_1["default"](dateString).fromNow(),
        formatString: dayjs_1["default"](dateString).format('D MMMM YYYYг. в HH:mm')
    };
}
exports.useTime = useTime;
