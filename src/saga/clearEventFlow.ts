import { fork, put, take } from 'redux-saga/effects';
import {eventCleared} from '../action/eventEvents';
import {clearEvent} from '../action/eventCommands';

export const onClearEvent = function*() {
    yield put(eventCleared({}));
};

export function* clearEventFlow() {
    while (true) {
        yield take(clearEvent.toString());

        yield fork(onClearEvent);
    }
}
