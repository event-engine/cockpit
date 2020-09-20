import { fork, put, take } from 'redux-saga/effects';
import {clearQuery} from '../action/queryCommands';
import {queryCleared} from '../action/queryEvents';

export const onClearQuery = function*() {
    yield put(queryCleared({}));
};

export function* clearQueryFlow() {
    while (true) {
        yield take(clearQuery.toString());


        yield fork(onClearQuery);
    }
}
