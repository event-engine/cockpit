import {Action, handleActions} from 'redux-actions';
import {
    queryExecuted, QueryExecutedPayload,
    queryExecutionBegan,
    QueryExecutionBeganPayload,
    queryExecutionFailed, QueryExecutionFailedPayload,
} from '../action/queryEvents';

export interface QueryState {
    result: any|null;
    error: Error|null;
}

export const initialState = {
    result: null,
    error: null,
};

/* eslint @typescript-eslint/no-unused-vars: 0 */
export const reducer = handleActions<QueryState, any>(
    {
        [queryExecutionBegan.toString()]: (state = initialState, action: Action<QueryExecutionBeganPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                result: null,
                error: null,
            };
        },
        [queryExecuted.toString()]: (state = initialState, action: Action<QueryExecutedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                result: action.payload.result,
            };
        },
        [queryExecutionFailed.toString()]: (state = initialState, action: Action<QueryExecutionFailedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                error: action.payload.error,
            };
        },
    },
    initialState,
);
