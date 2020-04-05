import {Action, handleActions} from 'redux-actions';
import {
    messageBoxUrlUpdated,
    MessageBoxUrlUpdatedPayload,
    schemaUrlUpdated,
    SchemaUrlUpdatedPayload,
} from '../action/settingsEvents';

export interface SettingsState {
    schemaUrl: string;
    messageBoxUrl: string;
}

export const initialState: SettingsState = {
    schemaUrl: process.env.REACT_APP_EE_SCHEMA_URL || '',
    messageBoxUrl: process.env.REACT_APP_EE_MESSAGE_BOX_URL || '',
};

export const reducer = handleActions<SettingsState, any>(
    {
        [schemaUrlUpdated.toString()]: (state = initialState, action: Action<SchemaUrlUpdatedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                schemaUrl: action.payload.url,
            };
        },
        [messageBoxUrlUpdated.toString()]: (state = initialState, action: Action<MessageBoxUrlUpdatedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                messageBoxUrl: action.payload.url,
            };
        },
    },
    initialState,
);
