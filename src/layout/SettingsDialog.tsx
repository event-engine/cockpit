import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton, makeStyles,
    Tab,
    Tabs,
    TextField,
    Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {messageBoxUrlUpdated, schemaUrlUpdated} from '../action/settingsEvents';
import {makeMessageBoxUrlSelector, makeSchemaUrlSelector} from '../selector/settingsSelector';
import AuthenticationForm from './SettingsDialog/AuthenticationForm';

const useStyles = makeStyles(theme => ({
    dialogContent: {
        height: '400px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
}

const SettingsDialog = (props: SettingsDialogProps) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const currentSchemaUrl = useSelector(makeSchemaUrlSelector());
    const currentMessageBoxUrl = useSelector(makeMessageBoxUrlSelector());
    const [tab, setTab] = useState<number>(0);
    const [schemaUrl, setSchemaUrl] = useState<string>('');
    const [messageBoxUrl, setMessageBoxUrl] = useState<string>('');

    useEffect(() => {
        setSchemaUrl(currentSchemaUrl);
    }, [currentSchemaUrl]);

    useEffect(() => {
        setMessageBoxUrl(currentMessageBoxUrl);
    }, [currentMessageBoxUrl]);

    const handleSave = () => {
        dispatch(schemaUrlUpdated({ url: schemaUrl }));
        dispatch(messageBoxUrlUpdated({ url: messageBoxUrl }));
        props.onClose();
    };

    return (
        <Dialog open={props.open} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle>
                Settings
                <IconButton className={classes.closeButton} onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent className={classes.dialogContent}>
                <Tabs
                    value={tab}
                    onChange={(_, newTab) => setTab(newTab)}
                    indicatorColor={'primary'}
                    textColor={'primary'}
                    centered={true}
                >
                    <Tab label={'Endpoints'} />
                    <Tab label={'Authentication'} />
                </Tabs>
                <Divider />
                <div>
                    {tab === 0 && (
                        <Grid container={true} spacing={3} style={{ marginTop: '20px' }}>
                            <Grid item={true} md={6}>
                                <TextField
                                    value={schemaUrl}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSchemaUrl(event.currentTarget.value)}
                                    variant={'outlined'}
                                    label={'Schema URL'}
                                    required={true}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item={true} md={6}>
                                <TextField
                                    value={messageBoxUrl}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessageBoxUrl(event.currentTarget.value)}
                                    variant={'outlined'}
                                    label={'Message Box URL'}
                                    required={true}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {tab === 1 && (
                        <div style={{ margin: '10px' }}>There is no direct authentication support as of yet. Take a look
                            at the preRequestHook to manually configure authentication for your needs.</div>
                        /*<AuthenticationForm />*/
                    )}
                </div>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button
                    children={'Cancel'}
                    onClick={props.onClose}
                    color={'secondary'}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    children={'Save'}
                    onClick={handleSave}
                />
            </DialogActions>
        </Dialog>
    );
};

export default SettingsDialog;
