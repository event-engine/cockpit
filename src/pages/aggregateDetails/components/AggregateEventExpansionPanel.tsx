import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
    Typography,
} from '@material-ui/core';
import {AggregateEvent} from '../../../api/types';
import JsonTree from '../../aggregates/components/JsonTree';
import Link from '../../common/components/Link';
import {makeAggregateDetailsUrl} from '../../../routes';

const useStyles = makeStyles(() => ({
    eventNameText: {
        flex: 1,
    },
}));

interface AggregateEventExpansionPanelProps {
    aggregateType: string;
    aggregateId: string;
    event: AggregateEvent;
}

const AggregateEventExpansionPanel = (props: AggregateEventExpansionPanelProps) => {

    const classes = useStyles();

    return (
        <ExpansionPanel TransitionProps={{ mountOnEnter: true }} >
            <ExpansionPanelSummary>
                <div className={classes.eventNameText}>
                    <Link
                        to={makeAggregateDetailsUrl(props.aggregateType, props.aggregateId, props.event.aggregateVersion)}
                        children={props.event.eventName}
                        onClick={event => event.stopPropagation()}
                    />
                </div>
                <Typography variant={'body1'}>{props.event.createdAt}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <JsonTree data={props.event} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default AggregateEventExpansionPanel;
