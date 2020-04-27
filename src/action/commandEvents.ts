import {createAction} from 'redux-actions';
import {AxiosResponse} from 'axios';

export interface CommandExecutionBeganPayload {
}

export interface CommandExecutionFailedPayload {
    error: Error;
    response?: AxiosResponse;
}
export const commandExecutionBegan = createAction<CommandExecutionBeganPayload>('COMMAND_EXECUTION_BEGAN');
export const commandExecutionFailed = createAction<CommandExecutionFailedPayload>('COMMAND_EXECUTION_FAILED');
