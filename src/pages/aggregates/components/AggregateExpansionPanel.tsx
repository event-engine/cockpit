import React from 'react';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles, Typography} from '@material-ui/core';
import JsonTree from './JsonTree';

const useStyles = makeStyles(theme => ({
    expansionPanelSummaryContent: {
        width: '100%',
    },
    summaryWrapper: {
        width: '100%',
    },
    summary: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        textOverflow: 'ellipsis',
        color: theme.palette.text.secondary,
    },
}));

interface AggregateExpansionPanelProps {
    aggregate: any;
    aggregateIdentifier: string;
}

const AggregateExpansionPanel = (props: AggregateExpansionPanelProps) => {

    const classes = useStyles();

    return (
        <ExpansionPanel TransitionProps={{ mountOnEnter: true }} >
            <ExpansionPanelSummary classes={{ content: classes.expansionPanelSummaryContent }}>
                <div className={classes.summaryWrapper}>
                    <div>{props.aggregateIdentifier}: {props.aggregate.state[props.aggregateIdentifier]}</div>
                    <Typography variant={'body1'} className={classes.summary}>
                        {JSON.stringify(props.aggregate)}
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <JsonTree data={props.aggregate} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default AggregateExpansionPanel;
