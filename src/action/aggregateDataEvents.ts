import {createAction} from 'redux-actions';
import {AggregateEvent, AggregateState, PersistedAggregateState} from '../api/types';

export interface AggregateListFetchedPayload {
    aggregateList: PersistedAggregateState[];
    aggregateType: string;
}

export interface AggregateStateFetchedPayload {
    aggregateId: string;
    aggregateState: AggregateState;
}

export interface AggregateStateClearedPayload {
    aggregateId: string;
}

export interface AggregateEventsFetchedPayload {
    aggregateId: string;
    aggregateEvents: AggregateEvent[];
}

export const aggregateListFetched = createAction<AggregateListFetchedPayload>('AGGREGATE_LIST_FETCHED');
export const aggregateStateFetched = createAction<AggregateStateFetchedPayload>('AGGREGATE_STATE_FETCHED');
export const aggregateStateCleared = createAction<AggregateStateClearedPayload>('AGGREGATE_STATE_CLEARED');
export const aggregateEventsFetched = createAction<AggregateEventsFetchedPayload>('AGGREGATE_EVENTS_FETCHED');
