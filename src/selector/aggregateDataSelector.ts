import { createSelector } from 'reselect';
import {ReduxState} from '../reducer';

const stateKey = 'aggregateData';

export const aggregateListsSelector = (state: ReduxState) => state[stateKey].aggregateLists;
export const aggregateStatesSelector = (state: ReduxState) => state[stateKey].aggregateStates;

export const makeAggregateListSelector = (aggregateType: string) => {
    return createSelector([aggregateListsSelector], aggregateLists => {
        return aggregateLists[aggregateType] ? aggregateLists[aggregateType] : null;
    });
};

export const makeAggregateStateSelector = (aggregateId: string) => {
    return createSelector([aggregateStatesSelector], aggregateStates => {
        return aggregateStates[aggregateId] || null;
    });
};
