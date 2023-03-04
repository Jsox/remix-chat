"use strict";
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
exports.loader = exports.meta = void 0;
var node_1 = require("@remix-run/node");
var react_1 = require("@remix-run/react");
var icons_1 = require("@tabler/icons");
var HeroText_1 = require("app/components/HeroText/HeroText");
var react_2 = require("react");
var Prisma_1 = require("app/lib/Prisma");
var auth_server_1 = require("app/services/auth.server");
var core_1 = require("@mantine/core");
var useTime_1 = require("app/hooks/useTime");
var useColors_1 = require("app/hooks/useColors");
exports.meta = function () {
    // const { currentProject } = useLoaderData();
    return {
        title: "",
        description: ""
    };
};
function loader(_a) {
    var request = _a.request, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var projectSlug, user, currentProject;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    projectSlug = params.projectSlug;
                    return [4 /*yield*/, auth_server_1["default"](request)];
                case 1:
                    user = _b.sent();
                    if (!user || !projectSlug) {
                        throw node_1.redirect('/', 404);
                    }
                    return [4 /*yield*/, Prisma_1.prismaClient.project.findFirst({
                            where: {
                                User: {
                                    id: user.id
                                },
                                url: projectSlug
                            }
                        })];
                case 2:
                    currentProject = _b.sent();
                    if (!currentProject) {
                        throw node_1.redirect('/', 404);
                    }
                    return [2 /*return*/, node_1.json({ projectSlug: projectSlug, currentProject: currentProject })];
            }
        });
    });
}
exports.loader = loader;
function ProjectPage() {
    var loader = react_1.useLoaderData();
    var currentProject = loader.currentProject;
    var _a = react_1.useOutletContext(), projects = _a.projects, setNavBarLinksAddon = _a.setNavBarLinksAddon;
    var temp = [];
    if (projects === null || projects === void 0 ? void 0 : projects.length) {
        var links = projects.map(function (project) {
            return {
                label: project.title,
                link: '/generate/project/' + project.url
            };
        });
        temp.push({
            label: 'Проекты',
            icon: icons_1.IconListDetails,
            links: links,
            initiallyOpened: true
        });
    }
    react_2.useEffect(function () {
        setNavBarLinksAddon(temp);
    });
    // const { projectSlug, currentProject } = useLoaderData();
    // const currentProject = projects.filter(project => projectSlug === project.url);
    // console.log({ currentProject });
    var _b = useTime_1.useTime(currentProject.created), fromNow = _b.fromNow, formatString = _b.formatString;
    var contrastColor = useColors_1.useColors().contrastColor;
    var desc = (React.createElement(React.Fragment, null,
        React.createElement(core_1.Text, null, "\u041D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B\u044B \u0431\u043B\u043E\u0433\u0430 \u0441 \u0438\u0445 \u043E\u0431\u044B\u0447\u043D\u044B\u043C\u0438 \u0438 \u043C\u0435\u0442\u0430-\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F\u043C\u0438, \u0430 \u0442\u0430\u043A \u0436\u0435 \u0441 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u043C\u0438 \u0441\u043B\u043E\u0432\u0430\u043C\u0438"),
        React.createElement(core_1.Text, { size: 'md', mt: 'md', color: contrastColor },
            "\u0421\u043E\u0437\u0434\u0430\u043D ",
            fromNow,
            " (",
            formatString,
            ")")));
    return (React.createElement(React.Fragment, null,
        React.createElement(HeroText_1.HeroText, { titleStart: React.createElement(core_1.Text, { tt: 'capitalize', size: 24 }, "\u041F\u0440\u043E\u0435\u043A\u0442 \u0411\u043B\u043E\u0433\u0430:"), titleHighlighted: currentProject.title, titleEnd: "", description: desc })));
}
exports["default"] = ProjectPage;
