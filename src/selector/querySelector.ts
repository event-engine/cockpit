import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';

const stateKey = 'query';

export const queryResultSelector = (state: ReduxState) => state[stateKey].result;
export const queryErrorSelector = (state: ReduxState) => state[stateKey].error;

export const makeQueryResultSelector = () => {
    return createSelector([queryResultSelector], result => {
        return result;
    });
};

export const makeQueryErrorSelector = () => {
    return createSelector([queryErrorSelector], error => {
        return error;
    });
};
