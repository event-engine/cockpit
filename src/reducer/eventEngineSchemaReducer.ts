import {createAction, handleActions} from 'redux-actions';
import {EventEngineSchema} from '../api/types';

export const updateRawSchema = createAction('UPDATE_RAW_SCHEMA');

export interface EventEngineSchemaState {
    rawSchema: null|EventEngineSchema;
}

export const initialState = {
    rawSchema: null,
};

export const reducer = handleActions<EventEngineSchemaState, any>(
    {
        [updateRawSchema.toString()]: (state = initialState, action: { payload: { rawSchema: EventEngineSchema } }) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                rawSchema: action.payload.rawSchema,
            };
        },
    },
    initialState,
);
