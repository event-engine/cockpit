import {createAction} from 'redux-actions';

export interface FetchAggregateListPayload {
    rawAggregateType: string;
}

export interface FetchAggregateStatePayload {
    rawAggregateType: string;
    aggregateId: string;
    version?: number;
}

export interface FetchAggregateEventsPayload {
    rawAggregateType: string;
    aggregateId: string;
}

export const fetchAggregateList = createAction<FetchAggregateListPayload>('FETCH_AGGREGATE_LIST');
export const fetchAggregateState = createAction<FetchAggregateStatePayload>('FETCH_AGGREGATE_STATE');
export const fetchAggregateEvents = createAction<FetchAggregateEventsPayload>('FETCH_AGGREGATE_EVENTS');
