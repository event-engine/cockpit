import {Action, createAction, handleActions} from 'redux-actions';
import {AggregateEvent} from '../api/types';

export const updateAggregateList = createAction('UPDATE_AGGREGATE_LIST');
export const updateAggregateState = createAction('UPDATE_AGGREGATE_STATE');
export const updateAggregateEvents = createAction('UPDATE_AGGREGATE_EVENTS');

export interface AggregateDataState {
    aggregateLists: Record<string, any[]>;
    aggregateStates: Record<string, any>;
    aggregateEvents: Record<string, AggregateEvent[]>;
}

export const initialState = {
    aggregateLists: {},
    aggregateStates: {},
    aggregateEvents: {},
};

export const reducer = handleActions<AggregateDataState, any>(
    {
        [updateAggregateList.toString()]: (state = initialState, action: Action<{ aggregateList: any[], aggregateType: string }>) => {
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
        [updateAggregateState.toString()]: (state = initialState, action: Action<{ aggregateId: string, aggregateState: any }>) => {
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
        [updateAggregateEvents.toString()]: (
            state = initialState,
            action: Action<{ aggregateId: string, aggregateEvents: AggregateEvent[] }>,
        ) => {
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
