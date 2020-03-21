import { call, fork, put, select, take } from 'redux-saga/effects';
import {fetchSystemSchema, FetchSystemSchemaPayload} from '../action/systemSchemaCommands';
import {Action} from 'redux-actions';
import {SystemSchema} from '../api/types';
import {systemSchemaFetched} from '../action/systemSchemaEvents';
import {getSystemSchema} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';

export const onFetchSystemSchema = function*() {
    try {
        const systemSchema: SystemSchema = yield call(getSystemSchema);
        yield put(systemSchemaFetched({ systemSchema }));
    } catch (e) {
        yield call(onEnqueueErrorSnackbar, 'Loading the system schema failed');
    }
};

export function* fetchSystemSchemaFlow() {
    while (true) {
        const action: Action<FetchSystemSchemaPayload> = yield take(fetchSystemSchema.toString());

        yield fork(onFetchSystemSchema);
    }
}
