import React, {useEffect} from 'react';
import {Card, CardContent, CardHeader, Divider} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import {useDispatch, useSelector} from 'react-redux';
import {
    makeAggregateMultiStoreModeSelector,
    makeRawAggregateTypeSelector,
} from '../../../selector/systemSchemaSelector';
import {MultiStoreMode} from '../../../api/types';
import {makeAggregateEventsSelector} from '../../../selector/aggregateDataSelector';
import AggregateEventExpansionPanel from './AggregateEventExpansionPanel';
import {fetchAggregateEvents} from '../../../action/aggregateDataCommands';

interface AggregateDetailsEventsWidgetProps {
    aggregateType: string;
    aggregateId: string;
    commandsExecuted: number;
}

const AggregateDetailsEventsWidget = (props: AggregateDetailsEventsWidgetProps) => {

    const dispatch = useDispatch();
    const rawAggregateType = useSelector(makeRawAggregateTypeSelector(props.aggregateType));
    const events = useSelector(makeAggregateEventsSelector(props.aggregateId));
    const multiStoreMode = useSelector(makeAggregateMultiStoreModeSelector(props.aggregateType));

    useEffect(() => {
        if (rawAggregateType) {
            dispatch(fetchAggregateEvents({ rawAggregateType, aggregateId: props.aggregateId }));
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [rawAggregateType, props.aggregateId, props.commandsExecuted]);

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
