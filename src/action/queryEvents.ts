import {createAction} from 'redux-actions';

export interface QueryExecutionBeganPayload {
}

export interface QueryExecutedPayload {
    result: any;
}

export interface QueryExecutionFailedPayload {
    error: Error;
}

export interface QueryClearedPaylod {
}

export const queryExecutionBegan = createAction<QueryExecutionBeganPayload>('QUERY_EXECUTION_BEGAN');
export const queryExecuted = createAction<QueryExecutedPayload>('QUERY_EXECUTED');
export const queryExecutionFailed = createAction<QueryExecutionFailedPayload>('QUERY_EXECUTION_FAILED');
export const queryCleared = createAction<QueryClearedPaylod>('QUERY_CLEARED');
