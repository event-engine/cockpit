import { fork, put, take } from 'redux-saga/effects';
import {commandCleared} from '../action/commandEvents';
import {clearCommand} from '../action/commandCommands';

export const onClearCommand = function*() {
    yield put(commandCleared({}));
};

export function* clearCommandFlow() {
    while (true) {
        yield take(clearCommand.toString());

        yield fork(onClearCommand);
    }
}
