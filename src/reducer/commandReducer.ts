import {Action, handleActions} from 'redux-actions';
import {AxiosResponse} from 'axios';
import {
    CommandExecutionBeganPayload,
    CommandExecutionFailedPayload,
    commandExecutionBegan,
    commandExecutionFailed,
} from '../action/commandEvents';

export interface CommandState {
    response: AxiosResponse|null;
    error: Error|null;
}

export const initialState = {
    response: null,
    error: null,
};

/* eslint @typescript-eslint/no-unused-vars: 0 */
export const reducer = handleActions<CommandState, any>(
    {
        [commandExecutionBegan.toString()]: (state = initialState, action: Action<CommandExecutionBeganPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: null,
                error: null,
            };
        },
        [commandExecutionFailed.toString()]: (state = initialState, action: Action<CommandExecutionFailedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                response: action.payload.response || null,
                error: action.payload.error,
            };
        },
    },
    initialState,
);
