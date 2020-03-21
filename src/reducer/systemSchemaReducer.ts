import {Action, handleActions} from 'redux-actions';
import {SystemSchema} from '../api/types';
import {systemSchemaFetched, SystemSchemaFetchedPayload} from '../action/systemSchemaEvents';

export interface SystemSchemaState {
    systemSchema: null|SystemSchema;
}

export const initialState = {
    systemSchema: null,
};

export const reducer = handleActions<SystemSchemaState, any>(
    {
        [systemSchemaFetched.toString()]: (state = initialState, action: Action<SystemSchemaFetchedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                systemSchema: action.payload.systemSchema,
            };
        },
    },
    initialState,
);
