import { call, fork, put, take } from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {snackbarEnqueued} from '../action/snackbarEvents';
import {
    enqueueErrorSnackbar,
    enqueueInfoSnackbar,
    EnqueueSnackbarPayload, enqueueSuccessSnackbar,
    enqueueWarningSnackbar,
} from '../action/snackbarCommands';
import { v4 as uuidv4 } from 'uuid';

export const onEnqueueErrorSnackbar = function*(message: string, autoHideDuration?: number) {
    yield put(snackbarEnqueued({ id: uuidv4(), severity: 'error', message, autoHideDuration }));
};

export const onEnqueueWarningSnackbar = function*(message: string, autoHideDuration?: number) {
    yield put(snackbarEnqueued({ id: uuidv4(), severity: 'warning', message, autoHideDuration }));
};

export const onEnqueueInfoSnackbar = function*(message: string, autoHideDuration?: number) {
    yield put(snackbarEnqueued({ id: uuidv4(), severity: 'info', message, autoHideDuration }));
};

export const onEnqueueSuccessSnackbar = function*(message: string, autoHideDuration?: number) {
    yield put(snackbarEnqueued({ id: uuidv4(), severity: 'success', message, autoHideDuration }));
};

export function* enqueueSnackbarFlow() {
    while (true) {
        const action: Action<EnqueueSnackbarPayload> = yield take([
            enqueueErrorSnackbar.toString(),
            enqueueWarningSnackbar.toString(),
            enqueueInfoSnackbar.toString(),
            enqueueSuccessSnackbar.toString(),
        ]);

        switch (action.type) {
            case enqueueErrorSnackbar.toString():
                yield fork(onEnqueueErrorSnackbar, action.payload.message, action.payload.autoHideDuration);
                break;
            case enqueueWarningSnackbar.toString():
                yield fork(onEnqueueWarningSnackbar, action.payload.message, action.payload.autoHideDuration);
                break;
            case enqueueInfoSnackbar.toString():
                yield fork(onEnqueueInfoSnackbar, action.payload.message, action.payload.autoHideDuration);
                break;
            case enqueueSuccessSnackbar.toString():
                yield fork(onEnqueueSuccessSnackbar, action.payload.message, action.payload.autoHideDuration);
                break;
        }
    }
}
