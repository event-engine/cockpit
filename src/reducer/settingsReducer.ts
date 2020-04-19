import {Action, handleActions} from 'redux-actions';
import {
    contextUpdated, ContextUpdatedPayload, envUpdated, EnvUpdatedPayload,
    messageBoxUrlUpdated,
    MessageBoxUrlUpdatedPayload,
    schemaUrlUpdated,
    SchemaUrlUpdatedPayload, themeSwitched, ThemeSwitchedPayload,
} from '../action/settingsEvents';
import {defaultEeUiConfig} from '../defaultEeUIConfig';
import {EeUiConfigEnv} from '../config';

export interface SettingsState extends EeUiConfigEnv {
    theme: 'light'|'dark';
}

export const initialState: SettingsState = {
    ...defaultEeUiConfig.env,
    theme: 'light',
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
        [contextUpdated.toString()]: (state = initialState, action: Action<ContextUpdatedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                context: action.payload.context,
            };
        },
        [themeSwitched.toString()]: (state = initialState, action: Action<ThemeSwitchedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                theme: action.payload.theme,
            };
        },
        [envUpdated.toString()]: (state = initialState, action: Action<EnvUpdatedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                ...action.payload,
            };
        },
    },
    initialState,
);
