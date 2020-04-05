import React, {useState} from 'react';
import {
    AppBar,
    Toolbar as MuiToolbar,
    IconButton,
    Hidden,
    makeStyles,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import {useDispatch} from 'react-redux';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
import SettingsDialog from './SettingsDialog';

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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface TopBarProps {
    onOpenSideBar: () => void;
}

const TopBar = (props: TopBarProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const handleRefresh = () => {
        dispatch(fetchSystemSchema({}));
    };

    const openSettingsDialog = () => {
        setSettingsOpen(true) ;
    };

    const closeSettingsDialog = () => {
        setSettingsOpen(false);
    };

    return (
        <AppBar position={'fixed'} color={'default'} className={classes.root}>
            <MuiToolbar>
                <Typography variant={'h1'} className={classes.headerText}>Event Engine UI</Typography>
                <div className={classes.flexGrow} />
                <IconButton className={classes.icon} title={'Refresh Schema'} onClick={handleRefresh}>
                    <UpdateIcon />
                </IconButton>
                <IconButton className={classes.icon} title={'Settings'} onClick={openSettingsDialog}>
                    <SettingsIcon />
                </IconButton>
                <Hidden lgUp={true}>
                    <IconButton onClick={props.onOpenSideBar} className={classes.icon}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <SettingsDialog open={settingsOpen} onClose={closeSettingsDialog}/>
            </MuiToolbar>
        </AppBar>
    );
};

export default TopBar;
