import {createAction} from 'redux-actions';
import {AggregateEvent} from '../api/types';

export interface AggregateListFetchedPayload {
    aggregateList: any[]; // @todo type
    aggregateType: string;
}

export interface AggregateStateFetchedPayload {
    aggregateId: string;
    aggregateState: any; // @todo type
}

export interface AggregateEventsFetchedPayload {
    aggregateId: string;
    aggregateEvents: AggregateEvent[];
}

export const aggregateListFetched = createAction<AggregateListFetchedPayload>('AGGREGATE_LIST_FETCHED');
export const aggregateStateFetched = createAction<AggregateStateFetchedPayload>('AGGREGATE_STATE_FETCHED');
export const aggregateEventsFetched = createAction<AggregateEventsFetchedPayload>('AGGREGATE_EVENTS_FETCHED');
