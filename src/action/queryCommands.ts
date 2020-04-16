import {createAction} from 'redux-actions';

export interface ExecuteQueryPayload {
    queryName: string;
    payload: any;
}

export const executeQuery = createAction<ExecuteQueryPayload>('EXECUTE_QUERY');
