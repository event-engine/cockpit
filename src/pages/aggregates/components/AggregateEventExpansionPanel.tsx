import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelDetails as MuiExpansionPanelDetails,
    ExpansionPanelSummary as MuiExpansionPanelSummary,
    withStyles
} from "@material-ui/core";
import React from "react";
import {Event} from "../../../api/types";
import JsonTree from "./JsonTree";

interface AggregateEventExpansionPanelProps {
    event: Event;
}

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);


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
