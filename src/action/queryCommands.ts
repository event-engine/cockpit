import {createAction} from 'redux-actions';

export interface ExecuteQueryPayload {
    queryName: string;
    payload: any;
}

export interface ClearQueryPayload {
}

export const executeQuery = createAction<ExecuteQueryPayload>('EXECUTE_QUERY');

export const clearQuery = createAction<ClearQueryPayload>('CLEAR_QUERY');
