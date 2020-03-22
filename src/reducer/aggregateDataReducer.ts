import {Action, createAction, handleActions} from 'redux-actions';
import {AggregateEvent} from '../api/types';
import {
    aggregateEventsFetched, AggregateEventsFetchedPayload,
    aggregateListFetched,
    AggregateListFetchedPayload,
    aggregateStateFetched,
    AggregateStateFetchedPayload,
} from '../action/aggregateDataEvents';

export interface AggregateDataState {
    aggregateLists: Record<string, any[]>;
    aggregateStates: Record<string, any>;
    aggregateEvents: Record<string, AggregateEvent[]>;
}

export const initialState: AggregateDataState = {
    aggregateLists: {},
    aggregateStates: {},
    aggregateEvents: {},
};

export const reducer = handleActions<AggregateDataState, any>(
    {
        [aggregateListFetched.toString()]: (state = initialState, action: Action<AggregateListFetchedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                aggregateLists: {
                    ...state.aggregateLists,
                    [action.payload.aggregateType]: action.payload.aggregateList,
                },
            };
        },
        [aggregateStateFetched.toString()]: (state = initialState, action: Action<AggregateStateFetchedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                aggregateStates: {
                    ...state.aggregateStates,
                    [action.payload.aggregateId]: action.payload.aggregateState,
                },
            };
        },
        [aggregateEventsFetched.toString()]: (state = initialState, action: Action<AggregateEventsFetchedPayload>) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                aggregateEvents: {
                    ...state.aggregateEvents,
                    [action.payload.aggregateId]: action.payload.aggregateEvents,
                },
            };
        },
    },
    initialState,
);
