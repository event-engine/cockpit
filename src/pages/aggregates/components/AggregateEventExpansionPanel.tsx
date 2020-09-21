import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles} from '@material-ui/core';
import React from 'react';
import {Event} from '../../../api/types';
import JsonTree from './JsonTree';
import MapIcon from '@material-ui/icons/Map';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

interface AggregateEventExpansionPanelProps {
    event: Event;
}

const useStyles = makeStyles(() => ({
    eventNameText: {
        flex: 1,
    }
}));

const AggregateEventExpansionPanel = (props: AggregateEventExpansionPanelProps) => {
    const classes = useStyles();

    return (
        <ExpansionPanel TransitionProps={{ mountOnEnter: true }} >
            <ExpansionPanelSummary>
                <div className={classes.eventNameText}>
                    {props.event.eventName}
                </div>
                {props.event.eventMapLink &&
                    <Typography variant="body1">
                        <a href={props.event.eventMapLink} target="_blank" rel="noopener noreferrer" title="show on event map">
                            <IconButton color="secondary" size="small">
                                <MapIcon />
                            </IconButton>
                        </a>
                    </Typography>
                }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <JsonTree data={props.event.schema} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default AggregateEventExpansionPanel;
