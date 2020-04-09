import {AuthenticationTypes} from './layout/SettingsDialog/AuthenticationForm';

const eeUiConfig = (window as any).eeUiConfig;

interface AuthOAuth2PasswordGrant {
    type: AuthenticationTypes.oauth2PasswordGrant;
    url: string;
    username: string;
    password: string;
}

interface AuthOAuth2ClientCredentialsGrant {
    type: AuthenticationTypes.oAuth2ClientCredentialsGrant;
    url: string;
    clientId: string;
    clientSecret: string;
}

export interface Config {
    environment: 'development'|'production';
    schemaUrl: string|null;
    messageBoxUrl: string|null;
    authentication: AuthOAuth2PasswordGrant|AuthOAuth2ClientCredentialsGrant|null;
    hooks: {
        preRequestHook: ((request: any, context: any) => any)|null,
    };
}

/* @todo validate config data */
export const config: Config = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    schemaUrl: eeUiConfig.env.schemaUrl || null,
    messageBoxUrl: eeUiConfig.env.messageBoxUrl || null,
    authentication: eeUiConfig.env.authentication || null,
    hooks: {
        preRequestHook: eeUiConfig.hooks.preRequestHook || null,
    },
};
