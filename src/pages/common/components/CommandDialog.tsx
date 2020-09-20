import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import GenerateMenu from './GenerateMenu';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import CommandForm from './CommandForm';
import React, {useRef} from 'react';
import {Command} from '../../../api/types';
import {useDispatch} from 'react-redux';
import {executeCommand} from '../../../action/commandCommands';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0.5),
        color: theme.palette.grey[500],
    },
    generateButton: {
        position: 'absolute',
        right: theme.spacing(6),
        top: theme.spacing(0.5),
        color: theme.palette.grey[500],
    },
}));

export interface AggregateIdentifier {
    identifier: string;
    value: string;
}

interface CommandDialogProps {
    open: boolean;
    onClose: () => void;
    commandDialogCommand: Command;
    aggregateIdentifier?: AggregateIdentifier;
}

const CommandDialog = (props: CommandDialogProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const commandFormRef = useRef();

    const handleExecuteCommand = () => {
        const payload = (commandFormRef.current as any).retrievePayload();
        dispatch(executeCommand({ commandName: props.commandDialogCommand.commandName, payload }));
    };

    return (
        <Dialog open={props.open} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle>
                {props.commandDialogCommand.commandName}
                <GenerateMenu className={classes.generateButton} />
                <IconButton className={classes.closeButton} onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: '24px 24px' }}>
                <CommandForm
                    command={props.commandDialogCommand}
                    aggregateIdentifier={props.aggregateIdentifier}
                    ref={commandFormRef}
                />
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
                    startIcon={<SendIcon />}
                    children={'Execute ' + props.commandDialogCommand.commandName}
                    style={{ textTransform: 'none', margin: '5px' }}
                    onClick={handleExecuteCommand}
                />
            </DialogActions>
        </Dialog>
    );
};

export default CommandDialog;
