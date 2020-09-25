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
import GenerateMenu from '../../common/components/GenerateMenu';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import React, {useRef} from 'react';
import {AggregateEvent, Event} from '../../../api/types';
import {useDispatch} from 'react-redux';
import {executeEvent} from '../../../action/eventCommands';
import EventForm from './EventForm';

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

interface EventDialogProps {
    open: boolean;
    onClose: () => void;
    eventDialogEvent: AggregateEvent;
    eventDefinition: Event;
}

const EventDialog = (props: EventDialogProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const eventFormRef = useRef();

    const handleExecuteEvent = () => {
        const payload = (eventFormRef.current as any).retrievePayload();
        dispatch(executeEvent({ eventName: props.eventDialogEvent.eventName, payload }));
    };

    return (
        <Dialog open={props.open} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle>
                {props.eventDialogEvent.eventName}
                <GenerateMenu className={classes.generateButton} />
                <IconButton className={classes.closeButton} onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent style={{ padding: '24px 24px' }}>
                <EventForm
                    event={props.eventDialogEvent}
                    definition={props.eventDefinition}
                    ref={eventFormRef}
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
                    children={'Send ' + props.eventDialogEvent.eventName}
                    style={{ textTransform: 'none', margin: '5px' }}
                    onClick={handleExecuteEvent}
                />
            </DialogActions>
        </Dialog>
    );
};

export default EventDialog;
