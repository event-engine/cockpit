import { createSelector } from 'reselect';
import {ReduxState} from '../reducer';
import {AggregateEvent} from '../api/types';

const stateKey = 'aggregateData';

export const aggregateListsSelector = (state: ReduxState) => state[stateKey].aggregateLists;
export const aggregateStatesSelector = (state: ReduxState) => state[stateKey].aggregateStates;
export const aggregateEventsSelector = (state: ReduxState) => state[stateKey].aggregateEvents;

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

export const makeAggregateEventsSelector = (aggregateId: string) => {
    return createSelector([aggregateEventsSelector], (aggregateEvents): AggregateEvent[]|null => {
        return aggregateEvents[aggregateId] || null;
    });
};
