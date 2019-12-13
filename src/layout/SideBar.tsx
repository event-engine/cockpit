import {Drawer, makeStyles, useMediaQuery} from "@material-ui/core";
import React from "react";
import theme from "../material-ui/theme";
import SideBarContent from "./SideBarContent";

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 300,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 32px)',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}));

interface SideBarProps {
    open: boolean;
    onClose: () => void;
}

const SideBar = (props: SideBarProps) => {

    const classes = useStyles();

    const sideBarPersistent = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    return (
        <Drawer
            open={props.open || sideBarPersistent}
            onClose={props.onClose}
            classes={{ paper: classes.drawer }}
            variant={sideBarPersistent ? 'persistent' : 'temporary'}
            children={(
                <div className={classes.root}>
                    <SideBarContent />
                </div>
            )}
        />
    );
};

export default SideBar;
