import {AuthOAuth2ClientCredentialsGrant, AuthOAuth2PasswordGrant} from './reducer/settingsReducer';

const eeUiConfig = (window as any).eeUiConfig;

export interface Config {
    environment: 'development'|'production';
    schemaUrl: string|null;
    messageBoxUrl: string|null;
    authentication: AuthOAuth2PasswordGrant|AuthOAuth2ClientCredentialsGrant|null;
    aggregateConfig: Record<string, Record<string, string>>|null;
    hooks: {
        preRequestHook: ((request: any, context: any) => any)|null,
    };
}

/* @todo validate config data */
export const config: Config = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    schemaUrl: eeUiConfig.env.schemaUrl || null,
    messageBoxUrl: eeUiConfig.env.messageBoxUrl || null,
    authentication: null, // Note: This is currently not in use
    aggregateConfig: eeUiConfig.env.aggregateConfig || null,
    hooks: {
        preRequestHook: eeUiConfig.hooks.preRequestHook || null,
    },
};
