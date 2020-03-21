import {createAction} from 'redux-actions';

export interface EnqueueSnackbarPayload {
    message: string;
    autoHideDuration?: number;
}

export const enqueueErrorSnackbar = createAction<EnqueueSnackbarPayload>('ENQUEUE_ERROR_SNACKBAR');
export const enqueueWarningSnackbar = createAction<EnqueueSnackbarPayload>('ENQUEUE_WARNING_SNACKBAR');
export const enqueueInfoSnackbar = createAction<EnqueueSnackbarPayload>('ENQUEUE_INFO_SNACKBAR');
export const enqueueSuccessSnackbar = createAction<EnqueueSnackbarPayload>('ENQUEUE_SUCCESS_SNACKBAR');
