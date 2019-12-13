import React from 'react';
import {AppBar, Toolbar as MuiToolbar, IconButton, Hidden, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        backgroundColor: '#42423B',
        height: '64px'
    },
    icon: {
        color: 'white'
    },
    flexGrow: {
        flexGrow: 1
    }
}));

interface TopBarProps {
    onOpenSideBar: () => void;
}

const TopBar = (props: TopBarProps) => {
    const classes = useStyles();

    return (
        <AppBar position={'fixed'} color={'default'} className={classes.root}>
            <MuiToolbar>
                <img src={undefined} />
                <div className={classes.flexGrow} />
                <Hidden lgUp>
                    <IconButton onClick={props.onOpenSideBar} className={classes.icon}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </MuiToolbar>
        </AppBar>
    );
};

export default TopBar;
