import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {EventEngineSchema} from './types';

const configuredAxios = axios.create({
});

export const sendApiRequest = async (
    config: AxiosRequestConfig,
) => {
    try {
        return await configuredAxios(config);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getEventEngineSchema = async (): Promise<EventEngineSchema> => {
    const response: AxiosResponse = await sendApiRequest({ url: process.env.REACT_APP_EE_SCHEMA_URL });
    return response.data as EventEngineSchema;
};

export const loadAggregatesForType = async (rawAggregateType: string): Promise<any[]> => {
    const response: AxiosResponse = await sendApiRequest({
        url: process.env.REACT_APP_EE_SCHEMA_URL + '/load-aggregates?aggregateType=' + rawAggregateType,
    });

    return response.data as any[];
};

export const loadAggregate = async (rawAggregateType: string, aggregateId: string): Promise<any> => {
    const response: AxiosResponse = await sendApiRequest({
        url: process.env.REACT_APP_EE_SCHEMA_URL + '/load-aggregate?aggregateType=' + rawAggregateType + '&aggregateId=' + aggregateId,
    });

    return response.data as any;
};

export const executeCommand = async (commandName: string, payload: any) => {
    const response: AxiosResponse = await sendApiRequest({
        url: process.env.REACT_APP_EE_MESSAGE_BOX_URL + `/${commandName}`,
        method: 'post',
        data: payload,
    });
};
