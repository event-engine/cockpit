import { call, fork, put, take } from 'redux-saga/effects';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
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
        yield take(fetchSystemSchema.toString());

        yield fork(onFetchSystemSchema);
    }
}
