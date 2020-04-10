import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AggregateEvent, AggregateState, PersistedAggregateState, SystemSchema} from './types';
import {Logger} from '../util/Logger';
import {store} from '../store';
import {config} from '../config';

const schemaUrl = () => store.getState().settings.schemaUrl;
const messageBoxUrl = () => store.getState().settings.messageBoxUrl;
const context = () => store.getState().settings.context;

const configuredAxios = axios.create({
});

export const sendApiRequest = async (
    requestConfig: AxiosRequestConfig,
) => {
    const finalizedRequestConfig = config.hooks.preRequestHook
        ? await config.hooks.preRequestHook(requestConfig, context())
        : requestConfig;

    try {
        return await configuredAxios(finalizedRequestConfig);
    } catch (error) {
        Logger.error(error);
        throw error;
    }
};

export const getSystemSchema = async (): Promise<SystemSchema> => {
    const response: AxiosResponse = await sendApiRequest({ url: schemaUrl() });
    return response.data as SystemSchema;
};

export const loadAggregatesForType = async (rawAggregateType: string): Promise<PersistedAggregateState[]> => {
    const response: AxiosResponse = await sendApiRequest({
        url: schemaUrl() + `/load-aggregates?aggregateType=${rawAggregateType}&limit=${config.aggregateList.filterLimit}`,
    });

    return response.data as PersistedAggregateState[];
};

export const loadAggregateState = async (rawAggregateType: string, aggregateId: string, version?: number): Promise<AggregateState> => {
    const response: AxiosResponse = await sendApiRequest({
        url: schemaUrl() + '/load-aggregate?aggregateType='
            + rawAggregateType + '&aggregateId=' + aggregateId + (version ? `&version=${version}` : ''),
    });

    return response.data as AggregateState;
};

export const loadAggregateEvents = async (rawAggregateType: string, aggregateId: string): Promise<AggregateEvent[]> => {
    const response: AxiosResponse = await sendApiRequest({
        url: schemaUrl() + '/load-aggregate-events?aggregateType='
            + rawAggregateType + '&aggregateId=' + aggregateId,
    });

    return response.data as AggregateEvent[];
};

export const executeCommand = async (commandName: string, payload: any) => {
    const response: AxiosResponse = await sendApiRequest({
        url: messageBoxUrl() + `/${commandName}`,
        method: 'post',
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
