import React from 'react';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import {useSelector} from 'react-redux';
import {makeAggregateEventsSelector} from '../../../selector/eventEngineSchemaSelector';
import AggregateEventExpansionPanel from './AggregateEventExpansionPanel';

interface AggregateEventsWidgetProps {
    aggregateType: string;
}

const AggregateEventsWidget = (props: AggregateEventsWidgetProps) => {

    const events = useSelector(makeAggregateEventsSelector(props.aggregateType));

    if (!events) {
        return null;
    }

    return (
        <Card>
            <CardHeader title={'Aggregate Events'} />
            <Divider />
            <CardContent>
                {events.map(event => <AggregateEventExpansionPanel event={event} />)}
            </CardContent>
        </Card>
    );
};

export default AggregateEventsWidget;
