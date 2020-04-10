import {AuthOAuth2ClientCredentialsGrant, AuthOAuth2PasswordGrant} from './reducer/settingsReducer';
import {AxiosRequestConfig} from 'axios';

const eeUiConfig = (window as any).eeUiConfig;

export interface Config {
    environment: 'development'|'production';
    schemaUrl: string|null;
    messageBoxUrl: string|null;
    authentication: AuthOAuth2PasswordGrant|AuthOAuth2ClientCredentialsGrant|null;
    aggregateList: {
        filterLimit: number;
        batchSize: number;
    };
    aggregateConfig: Record<string, Record<string, string>>|null;
    context: Record<string, string>|null;
    hooks: {
        preRequestHook: ((request: AxiosRequestConfig, context: Record<string, string>) => AxiosRequestConfig)|null,
    };
}

/* @todo validate config data */
export const config: Config = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    schemaUrl: eeUiConfig.env.schemaUrl || null,
    messageBoxUrl: eeUiConfig.env.messageBoxUrl || null,
    authentication: null, // Note: This is currently not in use
    aggregateList: {
        filterLimit: eeUiConfig.env.aggregateList.filterLimit || 500,
        batchSize: eeUiConfig.env.aggregateList.batchSize || 100,
    },
    aggregateConfig: eeUiConfig.env.aggregateConfig || null,
    context: eeUiConfig.env.context || null,
    hooks: {
        preRequestHook: eeUiConfig.hooks.preRequestHook || null,
    },
};
