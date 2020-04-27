import {createAction} from 'redux-actions';

export interface ExecuteCommandPayload {
    commandName: string;
    payload: any;
}

export const executeCommand = createAction<ExecuteCommandPayload>('EXECUTE_COMMAND');
