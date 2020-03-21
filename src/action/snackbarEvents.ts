import {createAction} from 'redux-actions';

export interface SnackbarEnqueuedPayload {
    id: string;
    severity: 'error'|'warning'|'info'|'success';
    message: string;
    autoHideDuration?: number;
}

export interface SnackbarDequeuedPayload {
    id: string;
}

export const snackbarEnqueued = createAction<SnackbarEnqueuedPayload>('SNACKBAR_ENQUEUED');
export const snackbarDequeued = createAction<SnackbarDequeuedPayload>('SNACKBAR_DEQUEUED');
