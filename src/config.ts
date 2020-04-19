import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {store} from './store';
import {defaultEeUiConfig} from './defaultEeUIConfig';
import {envUpdated} from './action/settingsEvents';

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
        preRequestHook: (
            request: AxiosRequestConfig,
            env: EeUiConfigEnv,
            updateEnv: (env: Partial<EeUiConfigEnv>) => void,
        ) => Promise<AxiosRequestConfig>,
        postRequestHook: (
            response: AxiosResponse,
            env: EeUiConfigEnv,
            updateEnv: (env: Partial<EeUiConfigEnv>) => void,
        ) => Promise<AxiosResponse>,
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

/**
 * This method may be passed to certain hooks to provide functionality to update the config env.
 *
 * @param env
 */
export const updateEeUiConfigEnv = (env: Partial<EeUiConfigEnv>): void => {
    store.dispatch(envUpdated(env));
};
