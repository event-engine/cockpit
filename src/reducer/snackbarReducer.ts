import {Action, handleActions} from 'redux-actions';
import {
    snackbarDequeued,
    SnackbarDequeuedPayload,
    snackbarEnqueued,
    SnackbarEnqueuedPayload,
} from '../action/snackbarEvents';

export interface Snackbar {
    id: string;
    severity: 'error'|'warning'|'info'|'success';
    message: string;
    autoHideDuration: number;
}

export interface SnackbarState {
    snackbars: Snackbar[];
}

export const initialState: SnackbarState = {
    snackbars: [],
};

export const reducer = handleActions<SnackbarState, any>(
    {
        [snackbarEnqueued.toString()]: (state = initialState, action: Action<SnackbarEnqueuedPayload>): SnackbarState => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                snackbars: [...state.snackbars, {
                    id: action.payload.id,
                    severity: action.payload.severity,
                    message: action.payload.message,
                    autoHideDuration: action.payload.autoHideDuration || 3000,
                }],
            };
        },
        [snackbarDequeued.toString()]: (state = initialState, action: Action<SnackbarDequeuedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                snackbars: state.snackbars.filter(snackbar => snackbar.id !== action.payload.id),
            };
        },
    },
    initialState,
);
