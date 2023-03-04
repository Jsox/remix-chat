"use strict";
exports.__esModule = true;
exports.useColors = void 0;
var core_1 = require("@mantine/core");
function useColors() {
    var theme = core_1.useMantineTheme();
    var colorScheme = core_1.useMantineColorScheme().colorScheme;
    var gradientTitleColor = {
        from: colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.blue[8],
        to: colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[9],
        deg: 180
    };
    var gradientTitle = {
        variant: 'gradient',
        gradient: gradientTitleColor
    };
    var contrastColor = colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9];
    var primaryTextColor = colorScheme === 'dark' ? theme.colors.white : theme.colors.white;
    var primaryBackgroundColor = colorScheme === 'dark' ? theme.colors.violet[8] : theme.colors.violet[6];
    var darkBlueBackgroundColor = colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[1];
    var darkBlueBackgroundColorNegative = colorScheme === 'dark' ? theme.colors.primary[9] : theme.colors.primary[6];
    var textColor = colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[9];
    var bodyBackgroundColor = colorScheme === 'dark' ? theme.colors.darkBlue[7] : theme.colors.gray[0];
    var header = colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[2];
    return {
        contrastColor: contrastColor,
        gradientTitleColor: gradientTitleColor,
        gradientTitle: gradientTitle,
        primaryTextColor: primaryTextColor,
        header: header,
        textColor: textColor,
        primaryBackgroundColor: primaryBackgroundColor,
        primaryStyles: {
            color: primaryTextColor,
            backgroundColor: primaryBackgroundColor
        },
        bodyStyles: {
            color: textColor,
            backgroundColor: bodyBackgroundColor
        },
        commentStyles: {
            color: primaryTextColor,
            backgroundColor: darkBlueBackgroundColor,
            borderColor: colorScheme === 'dark' ? theme.colors.darkBlue[3] : theme.colors.darkBlue[2]
        },
        commentStylesNegative: {
            color: primaryTextColor,
            backgroundColor: darkBlueBackgroundColorNegative,
            borderColor: colorScheme === 'dark' ? theme.colors.primary[8] : theme.colors.primary[5]
        }
    };
}
exports.useColors = useColors;
