import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';
import {Snackbar} from '../reducer/snackbarReducer';

const stateKey = 'snackbar';

export const snackbarListSelector = (state: ReduxState) => state[stateKey].snackbars;

export const makeCurrentSnackbarSelector = () => {
    return createSelector(
        [snackbarListSelector],
        (snackbarList): Snackbar|null => snackbarList[0] || null,
    );
};
