import React from 'react';
import {AppBar, Toolbar as MuiToolbar, IconButton, Hidden, makeStyles, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        backgroundColor: '#42423B',
        height: '64px',
    },
    icon: {
        color: 'white',
    },
    flexGrow: {
        flexGrow: 1,
    },
    headerText: {
        color: theme.palette.primary.main,
    },
}));

interface TopBarProps {
    onOpenSideBar: () => void;
}

const TopBar = (props: TopBarProps) => {
    const classes = useStyles();

    return (
        <AppBar position={'fixed'} color={'default'} className={classes.root}>
            <MuiToolbar>
                <Typography variant={'h1'} className={classes.headerText}>Event Engine UI</Typography>
                <div className={classes.flexGrow} />
                <Hidden lgUp={true}>
                    <IconButton onClick={props.onOpenSideBar} className={classes.icon}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </MuiToolbar>
        </AppBar>
    );
};

export default TopBar;
