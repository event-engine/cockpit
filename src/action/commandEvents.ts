import {createAction} from 'redux-actions';
import {AxiosResponse} from 'axios';

export interface CommandExecutionBeganPayload {
}

export interface CommandExecutedPayload {
    result: any;
}

export interface CommandExecutionFailedPayload {
    error: Error;
    response?: AxiosResponse;
}

export interface CommandClearedPayload {
}

export const commandExecutionBegan = createAction<CommandExecutionBeganPayload>('COMMAND_EXECUTION_BEGAN');
export const commandExecuted = createAction<CommandExecutedPayload>('COMMAND_EXECUTED');
export const commandExecutionFailed = createAction<CommandExecutionFailedPayload>('COMMAND_EXECUTION_FAILED');
export const commandCleared = createAction<CommandClearedPayload>('COMMAND_CLEARED');
