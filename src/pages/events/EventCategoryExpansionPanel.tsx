import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary, IconButton,
    List,
    ListItem,
    ListItemSecondaryAction, ListItemText,
    makeStyles,
} from '@material-ui/core';
import {Event} from '../../api/types';
import React, {SyntheticEvent} from 'react';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles(() => ({
    eventText: {
        wordWrap: 'break-word',
    },
    eventTextWithMapLink: {
        wordWrap: 'break-word',
        paddingRight: '50px',
    },
    selectedEvent: {
        backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
    },
    list: {
        width: '100%',
    },
}));

interface EventCategoryExpansionPanelProps {
    category: string;
    eventList: Event[];
    selectedEvent: string|undefined;
    onChangeSelectedEvent: (eventName: string) => void;
}

const EventCategoryExpansionPanel = (props: EventCategoryExpansionPanelProps) => {
    const classes = useStyles();

    const containsSelectedEvent = props.eventList.find(evt => evt.eventName === props.selectedEvent);

    const handleEventMapClick = (e: SyntheticEvent, event: Event) => {
        e.preventDefault();

        window.open(event.eventMapLink, 'IIOEventMap');
    };

    return (
        <ExpansionPanel defaultExpanded={!!containsSelectedEvent}>
            <ExpansionPanelSummary>
                {props.category}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List className={classes.list}>
                    {props.eventList.map((event: Event) => (
                        <ListItem
                            key={event.eventName}
                            button={true}
                            className={event.eventName === props.selectedEvent ? classes.selectedEvent : ''}
                            onClick={() => props.onChangeSelectedEvent(event.eventName)}
                        >
                            <ListItemText
                                primary={event.eventName}
                                className={(event.eventMapLink? classes.eventTextWithMapLink : classes.eventText)} />
                            {event.eventMapLink && <ListItemSecondaryAction>
                                    <IconButton onClick={e => handleEventMapClick(e, event)} title="show on event map">
                                        <MapIcon />
                                    </IconButton>
                            </ListItemSecondaryAction>}
                        </ListItem>
                    ))}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default EventCategoryExpansionPanel;
