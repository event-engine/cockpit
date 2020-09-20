import {createAction} from 'redux-actions';

export interface ExecuteCommandPayload {
    commandName: string;
    payload: any;
}

export interface ClearCommandPayload {
}

export const executeCommand = createAction<ExecuteCommandPayload>('EXECUTE_COMMAND');
export const clearCommand = createAction<ClearCommandPayload>('CLEAR_COMMAND');
