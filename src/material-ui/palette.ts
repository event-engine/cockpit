import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export const darkPalette = {
  type: 'dark',
  primary: {
      contrastText: white,
      dark: '#008394',
      main: '#00bcd4',
      light: '#33c9dc',
  },
  secondary: {
      contrastText: white,
      dark: '#90979a',
      main: '#cfd8dc',
      light: '#d8dfe3',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    link: colors.blue[600],
  },
  background: {
    default: '#303030',
    paper: '#424242',
    topBar: '#606060',
  },
  icon: colors.grey[200],
  divider: 'rgba(255, 255, 255, 0.12)',
};

export const lightPalette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#008394',
    main: '#00bcd4',
    light: '#33c9dc',
  },
  secondary: {
    contrastText: white,
    dark: '#2e2e29',
    main: '#42423b',
    light: '#676762',
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: '#F4F6F8',
    paper: white,
    topBar: '#42423B',
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
