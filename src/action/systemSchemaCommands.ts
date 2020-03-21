import {createAction} from 'redux-actions';

export interface FetchSystemSchemaPayload {
}

export const fetchSystemSchema = createAction<FetchSystemSchemaPayload>('FETCH_SYSTEM_SCHEMA');
