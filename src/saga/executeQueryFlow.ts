import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {Api} from '../api';
import {onEnqueueErrorSnackbar} from './enqueueSnackbarFlow';
import {ExecuteQueryPayload, executeQuery} from '../action/queryCommands';
import {queryExecuted, queryExecutionBegan, queryExecutionFailed} from '../action/queryEvents';

export const onExecuteQuery = function*(queryName: string, payload: any) {
    try {
        yield put(queryExecutionBegan({}));

        const result = yield call(Api.executeQuery, queryName, payload);
        yield put(queryExecuted({result}));
    } catch (e) {
        // If there is a response available we treat it like a successful response
        if (e.response) {
            yield put(queryExecuted({result: e.response}));
            return;
        }

        yield put(queryExecutionFailed({ error: e }));
        yield call(
            onEnqueueErrorSnackbar,
            `Executing query ${queryName} failed. Take a look at your browser console for details.`,
            6000,
        );
    }
};

export function* executeQueryFlow() {
    while (true) {
        const action: Action<ExecuteQueryPayload> = yield take(executeQuery.toString());

        yield fork(
            onExecuteQuery,
            action.payload.queryName,
            action.payload.payload,
        );
    }
}
