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
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, InputBase, TableContainer, Paper, Fab, Link,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {contextUpdated, messageBoxUrlUpdated, schemaUrlUpdated} from '../action/settingsEvents';
import {makeContextSelector, makeMessageBoxUrlSelector, makeSchemaUrlSelector} from '../selector/settingsSelector';
import {Alert} from '@material-ui/lab';
import {defaultEeUiConfig} from '../defaultEeUIConfig';

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
    contextTable: {
        width: '100%',
    },
    contextHeaderCell: {
        padding: '8px',
    },
    contextBodyCell: {
        padding: '4px',
    },
    contextInput: {
        width: '100%',
        padding: '4px',
    },
    contextFab: {
        padding: '6px',
        float: 'right',
        marginTop: '5px',
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
    const currentContext = useSelector(makeContextSelector());

    const [tab, setTab] = useState<number>(0);
    const [schemaUrl, setSchemaUrl] = useState<string>('');
    const [messageBoxUrl, setMessageBoxUrl] = useState<string>('');
    const [context, setContext] = useState<Array<{ key: string, value: string }>>([]);

    useEffect(() => {
        setSchemaUrl(currentSchemaUrl);
    }, [currentSchemaUrl]);

    useEffect(() => {
        setMessageBoxUrl(currentMessageBoxUrl);
    }, [currentMessageBoxUrl]);

    useEffect(() => {
        const tmpContext: Array<{ key: string, value: string }> = [];
        Object.keys(currentContext).forEach(key => {
            tmpContext.push({ key, value: currentContext[key] });
        });
        setContext(tmpContext);
    }, [currentContext]);

    const removeContextEntry = (pairIndex: number) => {
        setContext(context.filter((_, index) => index !== pairIndex));
    };

    const addNewContextEntry = () => {
        setContext([...context, { key: '', value: '' }]);
    };

    const changeContextEntryKey = (pairIndex: number, newValue: string) => {
        const tmpContext = [...context];
        tmpContext[pairIndex] = { ...tmpContext[pairIndex], key: newValue };
        setContext(tmpContext);
    };

    const changeContextEntryValue = (pairIndex: number, newValue: string) => {
        const tmpContext = [...context];
        tmpContext[pairIndex] = { ...tmpContext[pairIndex], value: newValue };
        setContext(tmpContext);
    };

    const resetSettings = () => {
        setMessageBoxUrl(defaultEeUiConfig.env.messageBoxUrl);
        setSchemaUrl(defaultEeUiConfig.env.schemaUrl);

        const tmpContext: Array<{ key: string, value: string }> = [];
        Object.keys(defaultEeUiConfig.env.context).forEach(key => {
            tmpContext.push({ key, value: defaultEeUiConfig.env.context![key] });
        });
        setContext(tmpContext);
    };

    const handleSave = () => {
        dispatch(schemaUrlUpdated({ url: schemaUrl }));
        dispatch(messageBoxUrlUpdated({ url: messageBoxUrl }));

        const newContext: Record<string, string> = {};
        context.forEach(({key, value}) => {
            newContext[key] = value;
        });
        dispatch(contextUpdated({ context: newContext }));

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
                <Alert severity={'info'}>
                    <span>
                        Adjusting the following settings will override the default configuration you provided in your
                        ee-ui.config.js file. The settings will be persisted in your browser storage and any updates to
                        the ee-ui.config.js file will not take effect unless you clear your browser storage. To reset
                        the settings now click <Link
                            href={'#'}
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                resetSettings();
                            }}
                            children={'here'}
                        />.
                    </span>
                </Alert>
                <Tabs
                    value={tab}
                    onChange={(_, newTab) => setTab(newTab)}
                    indicatorColor={'primary'}
                    textColor={'primary'}
                    centered={true}
                >
                    <Tab label={'Endpoints'} />
                    <Tab label={'Context'} />
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
                        <Grid container={true} spacing={3} style={{ marginTop: '20px' }}>
                            <Grid item={true} md={12}>
                                <TableContainer component={Paper}>
                                <Table className={classes.contextTable}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.contextHeaderCell}>Key</TableCell>
                                            <TableCell className={classes.contextHeaderCell}>Value</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {context.map(({ key, value }, pairIndex) => (
                                            <TableRow key={pairIndex}>
                                                <TableCell className={classes.contextBodyCell}>
                                                    <InputBase
                                                        className={classes.contextInput}
                                                        value={key}
                                                        onChange={e => changeContextEntryKey(pairIndex, e.target.value)}
                                                        // @ts-ignore
                                                        autoCorrect={'off'}
                                                        spellCheck={'false'}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.contextBodyCell}>
                                                    <InputBase
                                                        className={classes.contextInput}
                                                        value={value}
                                                        onChange={e => changeContextEntryValue(pairIndex, e.target.value)}
                                                        // @ts-ignore
                                                        autoCorrect={'off'}
                                                        spellCheck={'false'}
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.contextBodyCell} style={{ width: '36px' }}>
                                                    <IconButton
                                                        onClick={() => removeContextEntry(pairIndex)}
                                                        style={{ padding: '6px' }}
                                                        children={<CloseIcon />}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                <Fab
                                    color={'primary'}
                                    size={'small'}
                                    onClick={() => addNewContextEntry()}
                                    className={classes.contextFab}
                                    children={<AddIcon />}
                                />
                            </Grid>
                        </Grid>
                    )}
                    {tab === 2 && (
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
