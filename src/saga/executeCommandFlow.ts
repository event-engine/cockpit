import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {Api} from '../api';
import {onEnqueueErrorSnackbar, onEnqueueSuccessSnackbar} from './enqueueSnackbarFlow';
import {ExecuteCommandPayload, executeCommand} from '../action/commandCommands';
import {commandExecutionBegan, commandExecutionFailed} from '../action/commandEvents';

export const onExecuteCommand = function*(commandName: string, payload: any) {
    try {
        yield put(commandExecutionBegan({}));

        yield call(Api.executeCommand, commandName, payload);
        yield call(
            onEnqueueSuccessSnackbar,
            `Command ${commandName} was executed successfully.`,
            6000,
        );
    } catch (e) {
        yield put(commandExecutionFailed({ error: e, response: e.response || undefined }));
        yield call(
            onEnqueueErrorSnackbar,
            `Executing command ${commandName} failed. Take a look at your browser console for details.`,
            6000,
        );
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
