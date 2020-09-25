import React, {useState} from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import {lightTheme as muiTheme} from '../material-ui/theme';
import {makeStyles, useMediaQuery} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        boxSizing: 'border-box',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64,
        },
        backgroundColor: theme.palette.background.default,
    },
    shiftContent: {
        paddingLeft: 300,
    },
    content: {
        padding: 32,
        minHeight: '100%',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.background.default,
    },
}));

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {

    const classes = useStyles();
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

    const pushContent = useMediaQuery(muiTheme.breakpoints.up('lg'), {
        defaultMatches: true,
    });

    return (
        <div className={classes.root + ' ' + (pushContent ? classes.shiftContent : '')}>
            <TopBar onOpenSideBar={() => setSideBarOpen(true)} />
            <SideBar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
};

export default MainLayout;
