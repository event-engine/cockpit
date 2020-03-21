import {createAction} from 'redux-actions';
import {SystemSchema} from '../api/types';

export interface SystemSchemaFetchedPayload {
    systemSchema: SystemSchema;
}

export const systemSchemaFetched = createAction<SystemSchemaFetchedPayload>('SYSTEM_SCHEMA_FETCHED');
