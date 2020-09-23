import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';

const stateKey = 'event';

export const eventResponseSelector = (state: ReduxState) => state[stateKey].response;
export const eventErrorSelector = (state: ReduxState) => state[stateKey].error;

export const makeEventResponseSelector = () => {
    return createSelector([eventResponseSelector], response => {
        return response;
    });
};

export const makeEventErrorSelector = () => {
    return createSelector([eventErrorSelector], error => {
        return error;
    });
};
