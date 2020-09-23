import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {Api} from '../api';
import {ExecuteEventPayload, executeEvent} from '../action/eventCommands';
import {eventExecuted, eventExecutionBegan, eventExecutionFailed} from '../action/eventEvents';

export const onExecuteEvent = function*(eventName: string, payload: any) {
    try {
        yield put(eventExecutionBegan({}));

        const result = yield call(Api.executeEvent, eventName, payload);

        yield put(eventExecuted({result}));
    } catch (e) {
        yield put(eventExecutionFailed({ error: e, response: e.response || undefined }));
    }
};

export function* executeEventFlow() {
    while (true) {
        const action: Action<ExecuteEventPayload> = yield take(executeEvent.toString());

        yield fork(
            onExecuteEvent,
            action.payload.eventName,
            action.payload.payload,
        );
    }
}
