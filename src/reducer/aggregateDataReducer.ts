import {createAction, handleActions} from 'redux-actions';

export const updateAggregateList = createAction('UPDATE_AGGREGATE_LIST');

export interface AggregateDataState {
    aggregateLists: any;
}

export const initialState = {
    aggregateLists: {}
};

export const reducer = handleActions<AggregateDataState, any>(
    {
        [updateAggregateList.toString()]: (state = initialState, action: { payload: { aggregateList: any[], aggregateType: string } }) => {
            if (!state) {
                return state;
            }

            return {
                ...state,
                aggregateLists: {
                    ...state.aggregateLists,
                    [action.payload.aggregateType]: action.payload.aggregateList
                }
            };
        }
    },
    initialState
);
