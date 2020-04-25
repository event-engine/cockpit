import React from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/styles';
import {darkTheme, lightTheme} from './theme';
import {useSelector} from 'react-redux';
import {makeThemeSelector} from '../selector/settingsSelector';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {

    const theme = useSelector(makeThemeSelector());

    return (
        <MuiThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} children={props.children} />
    );
};

export default ThemeProvider;
