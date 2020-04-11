import React, {useState} from 'react';
import {
    AppBar,
    Toolbar as MuiToolbar,
    IconButton,
    Hidden,
    makeStyles,
    Typography,
    Menu,
    MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import CodeIcon from '@material-ui/icons/Code';
import {useDispatch} from 'react-redux';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
import SettingsDialog from './SettingsDialog';
import {copyToClipboard} from '../util/copyToClipboard';
import uuid from 'uuid/v4';

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
    const [generateAnchorElement, setGenerateAnchorElement] = useState(null);

    const handleGenerateButtonClick = (event: React.MouseEvent<any>) => {
        setGenerateAnchorElement(event.currentTarget);
    };

    const closeGenerateMenu = () => {
        setGenerateAnchorElement(null);
    };

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
                <IconButton className={classes.icon} title={'Generate ...'} onClick={handleGenerateButtonClick}>
                    <CodeIcon />
                </IconButton>
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
                {settingsOpen && <SettingsDialog open={settingsOpen} onClose={closeSettingsDialog} />}

                <Menu
                    anchorEl={generateAnchorElement}
                    keepMounted={true}
                    open={Boolean(generateAnchorElement)}
                    onClose={closeGenerateMenu}
                    style={{ top: '40px' }}
                >
                    <MenuItem
                        onClick={() => {
                            window.setTimeout(() => copyToClipboard(uuid()), 200);
                            closeGenerateMenu();
                        }}
                        children={'UUID v4'}
                    />
                </Menu>
            </MuiToolbar>
        </AppBar>
    );
};

export default TopBar;
