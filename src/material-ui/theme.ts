import { createMuiTheme } from '@material-ui/core';

import {darkPalette, lightPalette} from './palette';
import {darkTypography, lightTypography} from './typography';
import {darkOverrides, lightOverrides} from './overrides/index';

// @ts-ignore
export const lightTheme = createMuiTheme({
    palette: lightPalette,
    typography: lightTypography,
    overrides: lightOverrides,
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
});

// @ts-ignore
export const darkTheme = createMuiTheme({
    palette: darkPalette,
    typography: darkTypography,
    overrides: darkOverrides,
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
});
