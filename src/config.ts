import {AxiosRequestConfig} from 'axios';
import {store} from './store';
import {defaultEeUiConfig} from './defaultEeUIConfig';

export interface EeUiConfigEnv {
    schemaUrl: string;
    messageBoxUrl: string;
    aggregateList: {
        filterLimit: number;
        batchSize: number;
    };
    aggregateConfig: Record<string, Record<string, string>>;
    context: Record<string, string>;
}

export interface EeUiConfig {
    environment: 'development'|'production';
    env: EeUiConfigEnv;
    hooks: {
        preRequestHook: ((request: AxiosRequestConfig, context: Record<string, string>) => AxiosRequestConfig)|null,
    };
}

/**
 * This is the final config including any temporary or permanent overrides in the redux store
 */
export const eeUiConfig = (): EeUiConfig => {
    return {
        ...defaultEeUiConfig,
        env: {
            ...defaultEeUiConfig.env,
            ...store.getState().settings,
        },
    };
};
