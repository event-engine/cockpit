import { createSelector } from 'reselect';
import {ReduxState} from "../reducer";

const stateKey = 'aggregateData';

export const aggregateListsSelector = (state: ReduxState) => state[stateKey].aggregateLists;

export const makeAggregateListSelector = (aggregateType: string) => {
    return createSelector([aggregateListsSelector], (aggregateLists) => {
        return aggregateLists[aggregateType] ? aggregateLists[aggregateType] : null;
    });
};
