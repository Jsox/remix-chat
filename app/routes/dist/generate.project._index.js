"use strict";
exports.__esModule = true;
exports.meta = void 0;
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var core_1 = require("@mantine/core");
var hooks_1 = require("@mantine/hooks");
var notifications_1 = require("@mantine/notifications");
var icons_1 = require("@tabler/icons");
var Article_1 = require("app/components/Article");
var CreateProjectForm_1 = require("app/components/blog/CreateProjectForm");
var HeroText_1 = require("app/components/HeroText/HeroText");
var WaitingMessages_1 = require("app/components/WaitingMessages");
var articles_1 = require("app/data/articles");
var ProjectCard_1 = require("app/components/ProjectCard/ProjectCard");
var PageTitle_1 = require("app/components/PageTitle");
var InfoMessage_1 = require("app/components/InfoMessage");
exports.meta = function () { return ({
    title: 'Сгенерировать блог с помощью ИИ в несколько кликов',
    description: 'Сгенерировать высококачественный блог всего за несколько кликов. С помощью ИИ можно сгенерировать разделы и посты блога по указанной теме',
    keywords: 'назвать проект блога, выбрать название блога, привлечь читателей, создать бренд, сгенерировать блог'
}); };
function GenerateProject() {
    var _a;
    var _b = react_2.useOutletContext(), setNavBarLinksAddon = _b.setNavBarLinksAddon, projects = _b.projects;
    var _c = hooks_1.useInputState(''), newProject = _c[0], createNewProject = _c[1];
    var newProjectFetcher = react_2.useFetcher();
    react_1.useEffect(function () {
        setNavBarLinksAddon([]);
    });
    var isIdle = newProjectFetcher.state === 'idle';
    var submitNewProject = function () {
        newProjectFetcher.submit({
            projectName: newProject
        }, {
            method: 'post',
            action: '/api/createProject'
        });
    };
    react_1.useEffect(function () {
        if (newProjectFetcher.data && newProjectFetcher.data.error) {
            notifications_1.showNotification({
                id: 'fetcherError',
                title: 'Ошибка!',
                message: newProjectFetcher.data.error,
                color: 'red',
                icon: React.createElement(icons_1.IconAlertCircle, null)
            });
        }
        if (newProjectFetcher.data && !newProjectFetcher.data.error) {
            notifications_1.showNotification({
                id: 'fetcherError',
                title: 'Отлично!',
                message: "\u041F\u0440\u043E\u0435\u043A\u0442 \"" + newProjectFetcher.data.project.title + "\" \u0441\u043E\u0437\u0434\u0430\u043D!",
                color: 'green',
                icon: React.createElement(icons_1.IconCheck, null)
            });
        }
    }, [newProjectFetcher.data]);
    return (React.createElement(React.Fragment, null,
        React.createElement(HeroText_1.HeroText, { titleStart: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F", titleHighlighted: "\u0431\u043B\u043E\u0433\u0430 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0418\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0418\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0430", titleEnd: "\u0432 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043B\u0438\u043A\u043E\u0432", description: "\u041F\u0440\u043E\u0448\u043B\u0438 \u0442\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0430, \u043A\u043E\u0433\u0434\u0430 \u0441\u043E\u0437\u0434\u0430\u0442\u0435\u043B\u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u0447\u0430\u0441\u0430\u043C\u0438 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043B\u0438, \u043F\u0438\u0441\u0430\u043B\u0438 \u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0438 \u043E\u0434\u043D\u0443 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u0431\u043B\u043E\u0433\u0435. \u0421 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0418\u0418 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0432\u044B\u0441\u043E\u043A\u043E\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u0442\u0430\u043A \u0436\u0435 \u043F\u0440\u043E\u0441\u0442\u043E, \u043A\u0430\u043A \u043D\u0430\u0436\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043D\u043E\u043F\u043E\u043A" }),
        React.createElement(PageTitle_1["default"], { title: 'Введите краткое, но ёмкое название блога' }),
        React.createElement(react_2.Form, { onSubmit: submitNewProject },
            React.createElement(CreateProjectForm_1["default"], { error: (_a = newProjectFetcher === null || newProjectFetcher === void 0 ? void 0 : newProjectFetcher.data) === null || _a === void 0 ? void 0 : _a.error, description: 'Например: "Генерация блога с помощью ИИ", "Производство мороженого"', descriptionProps: {
                    align: 'center',
                    pb: 'xs'
                }, disabled: newProjectFetcher.state != 'idle', isloading: newProjectFetcher.state != 'idle' ? '1' : '', value: newProject, onChange: createNewProject }),
            !isIdle && React.createElement(WaitingMessages_1["default"], null)),
        !!projects.length && (React.createElement(React.Fragment, null,
            React.createElement(PageTitle_1["default"], { title: 'Перейти к существующему проекту' }),
            React.createElement(core_1.Flex, { gap: "lg", justify: "center", align: "flex-start", direction: "column", wrap: "wrap" }, !!projects.length &&
                projects.map(function (pr) { return (React.createElement(ProjectCard_1.ProjectCard, { key: pr === null || pr === void 0 ? void 0 : pr.url, url: pr === null || pr === void 0 ? void 0 : pr.url, title: pr.title, created: pr.created })); })))),
        !projects.length && (React.createElement(InfoMessage_1["default"], { text: "\u0423 \u0412\u0430\u0441 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432... \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u0432\u044B\u0448\u0435, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432 \u0444\u043E\u0440\u043C\u0443.", textAuthor: "\u0410\u0438\u0448\u0430" })),
        React.createElement(Article_1["default"], { height: 450, title: 'Генерация блога с помощью ИИ! Как? Почему?', html: articles_1.CreateProjectIndexArticle })));
}
exports["default"] = GenerateProject;
