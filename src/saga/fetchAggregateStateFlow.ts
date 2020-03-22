import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {loadAggregateState} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {fetchAggregateState, FetchAggregateStatePayload} from '../action/aggregateDataCommands';
import {aggregateStateCleared, aggregateStateFetched} from '../action/aggregateDataEvents';
import {AggregateState} from '../api/types';

export const onFetchAggregateState = function*(rawAggregateType: string, aggregateId: string, version?: number) {
    yield put(aggregateStateCleared({ aggregateId }));

    try {
        const aggregateState: AggregateState = yield call(loadAggregateState, rawAggregateType, aggregateId, version);
        yield put(aggregateStateFetched({aggregateId, aggregateState}));
    } catch (e) {
        yield call(onEnqueueErrorSnackbar, `Loading aggregate state of aggregate ${aggregateId} failed`);
    }
};

export function* fetchAggregateStateFlow() {
    while (true) {
        const action: Action<FetchAggregateStatePayload> = yield take(fetchAggregateState.toString());

        yield fork(
            onFetchAggregateState,
            action.payload.rawAggregateType,
            action.payload.aggregateId,
            action.payload.version,
        );
    }
}
