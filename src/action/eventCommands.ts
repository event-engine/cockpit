import {createAction} from 'redux-actions';

export interface ExecuteEventPayload {
    eventName: string;
    payload: any;
}

export interface ClearEventPayload {
}

export const executeEvent = createAction<ExecuteEventPayload>('EXECUTE_EVENT');
export const clearEvent = createAction<ClearEventPayload>('CLEAR_EVENT');
