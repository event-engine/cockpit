import {Action, handleActions} from 'redux-actions';
import {
    messageBoxUrlUpdated,
    MessageBoxUrlUpdatedPayload,
    schemaUrlUpdated,
    SchemaUrlUpdatedPayload,
} from '../action/settingsEvents';
import {config} from '../config';
import {AuthenticationTypes} from '../layout/SettingsDialog/AuthenticationForm';

export interface AuthOAuth2PasswordGrant {
    type: AuthenticationTypes.oauth2PasswordGrant;
    url: string;
    username: string;
    password: string;
}

export interface AuthOAuth2ClientCredentialsGrant {
    type: AuthenticationTypes.oAuth2ClientCredentialsGrant;
    url: string;
    clientId: string;
    clientSecret: string;
}

export interface SettingsState {
    schemaUrl: string;
    messageBoxUrl: string;
    authentication: AuthOAuth2PasswordGrant|AuthOAuth2ClientCredentialsGrant|null;
}

export const initialState: SettingsState = {
    schemaUrl: config.schemaUrl || '',
    messageBoxUrl: config.messageBoxUrl || '',
    authentication: config.authentication,
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
