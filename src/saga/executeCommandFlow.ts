import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {Api} from '../api';
import {ExecuteCommandPayload, executeCommand} from '../action/commandCommands';
import {commandExecuted, commandExecutionBegan, commandExecutionFailed} from '../action/commandEvents';

export const onExecuteCommand = function*(commandName: string, payload: any) {
    try {
        yield put(commandExecutionBegan({}));

        const result = yield call(Api.executeCommand, commandName, payload);

        yield put(commandExecuted({result}));
    } catch (e) {
        yield put(commandExecutionFailed({ error: e, response: e.response || undefined }));
    }
};

export function* executeCommandFlow() {
    while (true) {
        const action: Action<ExecuteCommandPayload> = yield take(executeCommand.toString());

        yield fork(
            onExecuteCommand,
            action.payload.commandName,
            action.payload.payload,
        );
    }
}
