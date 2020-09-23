import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    makeStyles,
} from '@material-ui/core';
import {AggregateEvent} from '../../../api/types';
import JsonTree from '../../aggregates/components/JsonTree';
import Link from '../../common/components/Link';
import {makeAggregateDetailsUrl} from '../../../routes';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
    eventNameText: {
        flex: 1,
    },
}));

interface AggregateEventExpansionPanelProps {
    aggregateType: string;
    aggregateId: string;
    event: AggregateEvent;
    onSendEvent: (event: AggregateEvent) => void;
}

const AggregateEventExpansionPanel = (props: AggregateEventExpansionPanelProps) => {

    const classes = useStyles();

    const handleSendClick = () => {
        props.onSendEvent(props.event);
    };

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
                <Typography variant={'body1'}>
                    {(new Date(props.event.createdAt)).toLocaleString()}&nbsp;
                    <IconButton size="small" onClick={handleSendClick}>
                        <SendIcon />
                    </IconButton>
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <JsonTree data={props.event} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default AggregateEventExpansionPanel;
