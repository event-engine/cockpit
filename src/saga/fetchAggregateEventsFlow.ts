import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {loadAggregateEvents} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {
    FetchAggregateEventsPayload,
    fetchAggregateEvents,
} from '../action/aggregateDataCommands';
import {aggregateEventsFetched} from '../action/aggregateDataEvents';
import {AggregateEvent} from '../api/types';

export const onFetchAggregateEvents = function*(rawAggregateType: string, aggregateId: string) {
    try {
        const aggregateEvents: AggregateEvent[] = yield call(loadAggregateEvents, rawAggregateType, aggregateId);
        yield put(aggregateEventsFetched({aggregateId, aggregateEvents}));
    } catch (e) {
        yield call(onEnqueueErrorSnackbar, `Loading aggregate events of aggregate ${aggregateId} failed`);
    }
};

export function* fetchAggregateEventsFlow() {
    while (true) {
        const action: Action<FetchAggregateEventsPayload> = yield take(fetchAggregateEvents.toString());

        yield fork(
            onFetchAggregateEvents,
            action.payload.rawAggregateType,
            action.payload.aggregateId,
        );
    }
}
