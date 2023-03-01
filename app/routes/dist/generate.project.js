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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.StepperDesc = exports.loader = void 0;
var core_1 = require("@mantine/core");
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var LoginButtons_1 = require("app/components/auth/LoginButtons");
var useBreakpoint_1 = require("app/hooks/useBreakpoint");
var Layout_1 = require("app/layouts/Layout");
var auth_server_1 = require("app/services/auth.server");
var react_2 = require("react");
var Prisma_1 = require("app/lib/Prisma");
var icons_1 = require("@tabler/icons");
// export async function action({ request }) {
//     const user = await auth(request);
//     if (!user) return redirect('/generate/project', 401);
// }
function loader(_a) {
    var request = _a.request, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var projectSlug, sectionSlug, user, projects, sections, topics;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log({ params: params });
                    projectSlug = params.projectSlug, sectionSlug = params.sectionSlug;
                    return [4 /*yield*/, auth_server_1["default"](request)];
                case 1:
                    user = _b.sent();
                    if (!user && projectSlug)
                        throw node_1.redirect('/generate/project', 301);
                    projects = [];
                    sections = [];
                    topics = [];
                    if (!(user && user.id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Prisma_1.prismaClient.project.findMany({
                            where: {
                                User: {
                                    id: user.id
                                }
                            },
                            include: {
                                Sections: true,
                                Topics: true
                            }
                        })];
                case 2:
                    projects = _b.sent();
                    return [4 /*yield*/, Prisma_1.prismaClient.section.findMany({
                            where: {
                                User: {
                                    id: user.id
                                }
                            },
                            include: {
                                Topics: true
                            }
                        })];
                case 3:
                    sections = _b.sent();
                    return [4 /*yield*/, Prisma_1.prismaClient.topic.findMany({
                            where: {
                                User: {
                                    id: user.id
                                }
                            }
                        })];
                case 4:
                    topics = _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, node_1.json({
                        projects: projects,
                        sections: sections,
                        topics: topics,
                        projectSlug: projectSlug,
                        sectionSlug: sectionSlug
                    })];
            }
        });
    });
}
exports.loader = loader;
function ProjectLayout() {
    var context = react_1.useOutletContext();
    var user = context.user, setAside = context.setAside;
    var _a = react_1.useLoaderData(), projects = _a.projects, sections = _a.sections, topics = _a.topics, projectSlug = _a.projectSlug, sectionSlug = _a.sectionSlug;
    // console.log({ projects, user });
    var _b = useBreakpoint_1["default"](), smallerSm = _b.smallerSm, isXl = _b.isXl;
    var active = 0;
    if (!user) {
        active = 0;
    }
    else {
        active = topics.length ? 4 : 3;
        active = sections.length ? 3 : 2;
        active = projects.length ? 2 : 1;
    }
    var aside = (React.createElement(core_1.Stepper, { mt: 'lg', size: smallerSm ? 'xs' : isXl ? 'md' : 'sm', active: active, orientation: "vertical", allowNextStepsSelect: false },
        React.createElement(core_1.Stepper.Step, { label: "\u0412\u0445\u043E\u0434", description: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C" },
            React.createElement(LoginButtons_1["default"], null)),
        React.createElement(core_1.Stepper.Step, { label: "\u041F\u0440\u043E\u0435\u043A\u0442", description: "\u041D\u0430\u0437\u043E\u0432\u0438\u0442\u0435 \u043F\u0440\u043E\u0435\u043A\u0442" },
            React.createElement(exports.StepperDesc, { title: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0431\u043B\u043E\u0433\u0430", desc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0440\u0430\u0442\u043A\u043E\u0435 \u043D\u043E \u0451\u043C\u043A\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0431\u043B\u043E\u0433\u0430, \u043E\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u0432\u0437\u044F\u0442\u043E \u0437\u0430 \u043E\u0441\u043D\u043E\u0432\u0443, \u043F\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438\r\n                    \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0441\u0430\u0439\u0442\u0430." })),
        React.createElement(core_1.Stepper.Step, { label: "\u0420\u0430\u0437\u0434\u0435\u043B\u044B", description: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u044B" },
            React.createElement(exports.StepperDesc, { title: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0431\u043B\u043E\u0433\u0430", desc: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044E \u0418\u0418 \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0438 \u0443\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0431\u043B\u043E\u0433\u0430. \u041D\u0430 \u0438\u0445 \u043E\u0441\u043D\u043E\u0432\u0435 \u0431\u0443\u0434\u0443\u0442 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0441\u0442\u0430\u0442\u044C\u0438." })),
        React.createElement(core_1.Stepper.Step, { label: "\u0421\u0442\u0430\u0442\u044C\u0438", description: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u044C\u0438" },
            React.createElement(exports.StepperDesc, { title: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0441\u0442\u0430\u0442\u0435\u0439 \u0431\u043B\u043E\u0433\u0430", desc: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0418\u0418-\u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A\u0430 \u0410\u0438\u0448\u0443 \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0445 \u0441\u0442\u0430\u0442\u0435\u0439 \u0434\u043B\u044F \u0431\u043B\u043E\u0433\u0430 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0432\u0430\u0448\u0435\u0433\u043E \u0431\u043B\u043E\u0433\u0430. \u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u044B\u0441\u043E\u043A\u043E\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043D\u0430\u0439\u0434\u0435\u0442 \u043E\u0442\u043A\u043B\u0438\u043A \u0443 \u0432\u0430\u0448\u0435\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438." })),
        React.createElement(core_1.Stepper.Completed, null,
            React.createElement(exports.StepperDesc, { title: "\u0423\u0440\u0430!", desc: "\u0412\u044B \u0443\u0436\u0435 \u0441\u043E\u0432\u0441\u0435\u043C \u043E\u0441\u0432\u043E\u0438\u043B\u0438\u0441\u044C \u0438 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u0431\u043B\u043E\u0433 \u0441 \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u043C\u0438 \u0438 \u0441\u0442\u0430\u0442\u044C\u044F\u043C\u0438. \u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C!" }))));
    react_2.useEffect(function () {
        setAside([aside]);
    });
    return (React.createElement(Layout_1["default"], null,
        React.createElement(react_1.Outlet, { context: __assign(__assign({}, context), { projects: projects, sections: sections, topics: topics, projectSlug: projectSlug, sectionSlug: sectionSlug }) })));
}
exports["default"] = ProjectLayout;
exports.StepperDesc = function (_a) {
    var title = _a.title, desc = _a.desc;
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Title, { align: "center", m: 0, py: 'md', order: 4 },
            React.createElement(icons_1.IconBulb, { color: 'yellow' }),
            " ",
            title),
        React.createElement(core_1.Text, { align: "justify" }, desc)));
};
