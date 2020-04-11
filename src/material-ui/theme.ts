import { createMuiTheme } from '@material-ui/core';

import {lightPalette} from './palette';
import typography from './typography';
import overrides from './overrides/index';

// @ts-ignore
const theme = createMuiTheme({
    palette: lightPalette,
    typography,
    overrides,
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
});

export default theme;
