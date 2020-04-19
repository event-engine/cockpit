import {createAction} from 'redux-actions';
import {EeUiConfigEnv} from '../config';

export interface SchemaUrlUpdatedPayload {
    url: string;
}

export interface MessageBoxUrlUpdatedPayload {
    url: string;
}

export interface ContextUpdatedPayload {
    context: Record<string, string>;
}

export interface ThemeSwitchedPayload {
    theme: 'dark'|'light';
}

export interface EnvUpdatedPayload extends Partial<EeUiConfigEnv> {
}

export const schemaUrlUpdated = createAction<SchemaUrlUpdatedPayload>('SCHEMA_URL_UPDATED');
export const messageBoxUrlUpdated = createAction<MessageBoxUrlUpdatedPayload>('MESSAGE_BOX_URL_UPDATED');
export const contextUpdated = createAction<ContextUpdatedPayload>('CONTEXT_UPDATED');
export const themeSwitched = createAction<ThemeSwitchedPayload>('THEME_SWITCHED');
export const envUpdated = createAction<EnvUpdatedPayload>('ENV_UPDATED');
