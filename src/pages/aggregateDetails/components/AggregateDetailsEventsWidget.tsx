import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeRawAggregateTypeSelector} from '../../../selector/eventEngineSchemaSelector';
import {loadAggregateEvents} from '../../../api';
import {updateAggregateEvents} from '../../../reducer/aggregateDataReducer';
import {AggregateEvent} from '../../../api/types';
import {makeAggregateEventsSelector} from '../../../selector/aggregateDataSelector';
import AggregateEventExpansionPanel from './AggregateEventExpansionPanel';

interface AggregateDetailsEventsWidgetProps {
    aggregateType: string;
    aggregateId: string;
}

const AggregateDetailsEventsWidget = (props: AggregateDetailsEventsWidgetProps) => {

    const dispatch = useDispatch();
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const events = useSelector(makeAggregateEventsSelector(props.aggregateId));

    useEffect(() => {
        if (rawAggregateType) {
            loadAggregateEvents(rawAggregateType, props.aggregateId).then((aggregateEvents: AggregateEvent[]) => {
                dispatch(updateAggregateEvents({ aggregateId: props.aggregateId, aggregateEvents }));
            });
        }
    }, [rawAggregateType, props.aggregateId]);

    if (null === events) {
        return null;
    }

    return (
        <Card>
            <CardHeader title={'Events'} />
            <Divider />
            <CardContent>
                {events.map((event, index) => (
                    <AggregateEventExpansionPanel
                        key={index}
                        aggregateType={props.aggregateType}
                        aggregateId={props.aggregateId}
                        event={event}
                    />
                ))}
            </CardContent>
        </Card>
    );
};

export default AggregateDetailsEventsWidget;
