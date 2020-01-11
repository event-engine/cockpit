import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core';
import React from 'react';
import {Event} from '../../../api/types';
import JsonTree from './JsonTree';

interface AggregateEventExpansionPanelProps {
    event: Event;
}

const AggregateEventExpansionPanel = (props: AggregateEventExpansionPanelProps) => {
    return (
        <ExpansionPanel TransitionProps={{ mountOnEnter: true }} >
            <ExpansionPanelSummary>
                {props.event.eventName}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <JsonTree data={props.event.schema} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default AggregateEventExpansionPanel;
