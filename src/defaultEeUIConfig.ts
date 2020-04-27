import {EeUiConfig} from './config';

const injectedConfig = (window as any).eeUiConfig;

/* @todo validate config data */

/**
 * This is the config solely derived from the ee-cockpit.config.js and the default values (not including any overrides).
 * This config can therefore be used even before the initialization of redux.
 */
export const defaultEeUiConfig: EeUiConfig = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    env: {
        schemaUrl: injectedConfig.env.schemaUrl || '',
        messageBoxUrl: injectedConfig.env.messageBoxUrl || '',
        aggregateList: {
            filterLimit: injectedConfig.env.aggregateList.filterLimit || 500,
            batchSize: injectedConfig.env.aggregateList.batchSize || 100,
        },
        aggregateConfig: injectedConfig.env.aggregateConfig || {},
        context: injectedConfig.env.context || {},
    },
    hooks: {
        preRequestHook: injectedConfig.hooks.preRequestHook || (request => request),
        postRequestHook: injectedConfig.hooks.postRequestHook || (response => response),
    },
};
