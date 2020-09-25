import {Action, handleActions} from 'redux-actions';
import {AxiosResponse} from 'axios';
import {
    EventClearedPayload, EventExecutedPayload,
    EventExecutionBeganPayload,
    EventExecutionFailedPayload,
    eventCleared,
    eventExecuted, eventExecutionBegan, eventExecutionFailed,
} from '../action/eventEvents';


export interface EventState {
    response: AxiosResponse|null;
    error: Error|null;
}

export const initialState = {
    response: null,
    error: null,
};

/* eslint @typescript-eslint/no-unused-vars: 0 */
export const reducer = handleActions<EventState, any>(
    {
        [eventExecutionBegan.toString()]: (state = initialState, action: Action<EventExecutionBeganPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: null,
                error: null,
            };
        },
        [eventExecuted.toString()]: (state = initialState, action: Action<EventExecutedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: action.payload.result,
                error: null,
            };
        },
        [eventExecutionFailed.toString()]: (state = initialState, action: Action<EventExecutionFailedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: action.payload.response || null,
                error: action.payload.error,
            };
        },
        [eventCleared.toString()]: (state = initialState, action: Action<EventClearedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: null,
                error: null,
            };
        },
    },
    initialState,
);
