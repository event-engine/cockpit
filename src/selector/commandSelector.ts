import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';

const stateKey = 'command';

export const commandResponseSelector = (state: ReduxState) => state[stateKey].response;
export const commandErrorSelector = (state: ReduxState) => state[stateKey].error;

export const makeCommandResponseSelector = () => {
    return createSelector([commandResponseSelector], response => {
        return response;
    });
};

export const makeCommandErrorSelector = () => {
    return createSelector([commandErrorSelector], error => {
        return error;
    });
};
