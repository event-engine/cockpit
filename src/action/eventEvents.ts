import {createAction} from 'redux-actions';
import {AxiosResponse} from 'axios';

export interface EventExecutionBeganPayload {
}

export interface EventExecutedPayload {
    result: any;
}

export interface EventExecutionFailedPayload {
    error: Error;
    response?: AxiosResponse;
}

export interface EventClearedPayload {
}

export const eventExecutionBegan = createAction<EventExecutionBeganPayload>('EVENT_EXECUTION_BEGAN');
export const eventExecuted = createAction<EventExecutedPayload>('EVENT_EXECUTED');
export const eventExecutionFailed = createAction<EventExecutionFailedPayload>('EVENT_EXECUTION_FAILED');
export const eventCleared = createAction<EventClearedPayload>('EVENT_CLEARED');
