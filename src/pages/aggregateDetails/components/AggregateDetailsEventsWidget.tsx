import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateMultiStoreModeSelector,
    makeRawAggregateTypeSelector,
} from '../../../selector/eventEngineSchemaSelector';
import {loadAggregateEvents} from '../../../api';
import {updateAggregateEvents} from '../../../reducer/aggregateDataReducer';
import {AggregateEvent, MultiStoreMode} from '../../../api/types';
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
    const multiStoreMode = useSelector(makeAggregateMultiStoreModeSelector(props.aggregateType));

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
            <CardHeader
                title={'Aggregate Events'}
                subheader={'Click on an event to view the aggregate state at a previous point in time'}
            />
            <Divider />
            <CardContent>
                {multiStoreMode === MultiStoreMode.State && (
                    <Alert severity={'info'}>
                        <AlertTitle>Info</AlertTitle>
                        Event-Engine is operating in state-only mode for this type of aggregate, meaning that events
                        are not persisted and can therefore not be loaded for this aggregate.
                    </Alert>
                )}

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
