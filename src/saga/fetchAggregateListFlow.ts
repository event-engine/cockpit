import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {loadAggregatesForType} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {FetchAggregateListPayload, fetchAggregateList} from '../action/aggregateDataCommands';
import {aggregateListFetched} from '../action/aggregateDataEvents';
import {normalizeAggregateType} from '../selector/systemSchemaSelector';
import {PersistedAggregateState} from '../api/types';

export const onFetchAggregateList = function*(rawAggregateType: string) {
    try {
        const aggregateList: PersistedAggregateState[] = yield call(loadAggregatesForType, rawAggregateType);

        yield put(aggregateListFetched({
            aggregateList,
            aggregateType: normalizeAggregateType(rawAggregateType),
        }));
    } catch (e) {
        yield call(onEnqueueErrorSnackbar, `Loading the aggregate list for the aggregate type ${rawAggregateType} failed`);
    }
};

export function* fetchAggregateListFlow() {
    while (true) {
        const action: Action<FetchAggregateListPayload> = yield take(fetchAggregateList.toString());

        yield fork(onFetchAggregateList, action.payload.rawAggregateType);
    }
}
