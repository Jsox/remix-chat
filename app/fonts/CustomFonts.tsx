import { Global } from '@mantine/core';
import bold from './Ubuntu-Bold.ttf';
import regular from './Ubuntu-Regular.ttf';
import light from './Ubuntu-Light.ttf';
import medium from './Ubuntu-Medium.ttf';
// import ptBold from './PTSans-Bold.ttf';
// import ptReg from './PTSans-Regular.ttf';
import comfortaa from './Comfortaa-VariableFont_wght.ttf';

export function CustomFonts() {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        src: `local('Ubuntu'), url('${bold}') format("truetype")`,
                        fontWeight: 700,
                        fontStyle: 'bold',
                        fontDisplay: 'swap'
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        src: `local('Ubuntu'), url('${regular}') format("truetype")`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontDisplay: 'swap'
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        src: `local('Ubuntu'), url('${light}') format("truetype")`,
                        fontWeight: 300,
                        fontStyle: 'light',
                        fontDisplay: 'swap'
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Ubuntu',
                        src: `local('Ubuntu'), url('${medium}') format("truetype")`,
                        fontWeight: 500,
                        fontStyle: 'medium',
                        fontDisplay: 'swap'
                    },
                },
                {
                    '@font-face': {
                        fontFamily: 'Comfortaa',
                        src: `local('Comfortaa'), url('${comfortaa}') format("truetype")`,
                        fontDisplay: 'swap'
                    },
                },
            ]}
        />
    );
}
