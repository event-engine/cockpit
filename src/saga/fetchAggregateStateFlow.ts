import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {loadAggregateState} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {fetchAggregateState, FetchAggregateStatePayload} from '../action/aggregateDataCommands';
import {aggregateStateFetched} from '../action/aggregateDataEvents';

export const onFetchAggregateState = function*(rawAggregateType: string, aggregateId: string, version?: number) {
    try {
        const aggregateState = yield call(loadAggregateState, rawAggregateType, aggregateId, version);
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
