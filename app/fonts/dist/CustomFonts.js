"use strict";
exports.__esModule = true;
exports.CustomFonts = void 0;
var core_1 = require("@mantine/core");
var Ubuntu_Bold_ttf_1 = require("./Ubuntu-Bold.ttf");
var Ubuntu_Regular_ttf_1 = require("./Ubuntu-Regular.ttf");
var Ubuntu_Light_ttf_1 = require("./Ubuntu-Light.ttf");
var Ubuntu_Medium_ttf_1 = require("./Ubuntu-Medium.ttf");
// import ptBold from './PTSans-Bold.ttf';
// import ptReg from './PTSans-Regular.ttf';
var Comfortaa_VariableFont_wght_ttf_1 = require("./Comfortaa-VariableFont_wght.ttf");
function CustomFonts() {
    return (React.createElement(core_1.Global, { styles: [
            {
                '@font-face': {
                    fontFamily: 'Ubuntu',
                    src: "url('" + Ubuntu_Bold_ttf_1["default"] + "') format(\"truetype\")",
                    fontWeight: 700,
                    fontStyle: 'bold'
                }
            },
            {
                '@font-face': {
                    fontFamily: 'Ubuntu',
                    src: "url('" + Ubuntu_Regular_ttf_1["default"] + "') format(\"truetype\")",
                    fontWeight: 400,
                    fontStyle: 'normal'
                }
            },
            {
                '@font-face': {
                    fontFamily: 'Ubuntu',
                    src: "url('" + Ubuntu_Light_ttf_1["default"] + "') format(\"truetype\")",
                    fontWeight: 300,
                    fontStyle: 'light'
                }
            },
            {
                '@font-face': {
                    fontFamily: 'Ubuntu',
                    src: "url('" + Ubuntu_Medium_ttf_1["default"] + "') format(\"truetype\")",
                    fontWeight: 500,
                    fontStyle: 'medium'
                }
            },
            {
                '@font-face': {
                    fontFamily: 'Comfortaa',
                    src: "url('" + Comfortaa_VariableFont_wght_ttf_1["default"] + "') format(\"truetype\")"
                }
            },
        ] }));
}
exports.CustomFonts = CustomFonts;
