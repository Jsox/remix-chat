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
exports.Generator = void 0;
var openai_1 = require("openai");
var dotenv = require("dotenv");
var fetch_sse_1 = require("./fetch-sse");
var AiModels_1 = require("./AiModels");
dotenv.config();
var configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
var openai = new openai_1.OpenAIApi(configuration);
var Generator = /** @class */ (function () {
    function Generator(query, generateNum) {
        if (generateNum === void 0) { generateNum = 10; }
        this.model = 'text-davinci-003';
        this.generateNum = generateNum;
        this.settings = AiModels_1.AiModels(query, this.model, this.generateNum);
    }
    Generator.prototype.runSse = function (uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var queryModel, key, wholeText, onMessage, res, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryModel = this.settings[this.job];
                        key = process.env.OPENAI_API_KEY || '';
                        wholeText = '';
                        onMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
                            var json, text;
                            return __generator(this, function (_a) {
                                if (message != '[DONE]') {
                                    json = JSON.parse(message);
                                    text = json.choices[0].text;
                                    wholeText += text;
                                    // fs.appendFile(`./messages/${uuid}`, text, function (err) {
                                    //     if (err) {
                                    //         return console.log(err);
                                    //     }
                                    // });
                                    // console.log(text);
                                    console.log({ wholeText: wholeText });
                                    return [2 /*return*/, text];
                                }
                                else {
                                    // let json = JSON.parse(message);
                                    // const finishReason = json.choices[0].finish_reason;
                                    // const text = json.choices[0].text;
                                    // console.log({ text }, { finishReason });
                                    console.log('!!!!!!![DONE]');
                                }
                                return [2 /*return*/];
                            });
                        }); };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch_sse_1.fetchSSE('https://api.openai.com/v1/completions', {
                                onMessage: onMessage,
                                headers: {
                                    Authorization: "Bearer " + key,
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: JSON.stringify(queryModel)
                            })];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, wholeText];
                    case 3:
                        error_1 = _a.sent();
                        console.log({ ERRORSSE: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.generateBlogSections = function () {
        return __awaiter(this, void 0, Promise, function () {
            var completion, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.job = 'generateBlogSections';
                        this.queryModel = this.settings[this.job];
                        console.log(this.queryModel);
                        return [4 /*yield*/, openai.createCompletion(this.queryModel)];
                    case 1:
                        completion = _a.sent();
                        console.log({ data: completion.data.choices[0] });
                        return [2 /*return*/, completion.data];
                    case 2:
                        error_2 = _a.sent();
                        console.log({ ERROR: error_2 });
                        return [2 /*return*/, { error: error_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
exports.Generator = Generator;
// const completion = await openai.createCompletion();
