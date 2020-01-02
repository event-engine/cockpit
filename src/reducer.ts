import {combineReducers} from "redux";
import {
    reducer as eventEngineSchemaReducer,
    initialState as eventEngineSchemaInitialState,
    EventEngineSchemaState
} from './reducer/eventEngineSchemaReducer';
import {
    reducer as aggregateDataReducer,
    initialState as aggregateDataInitialState,
    AggregateDataState
} from "./reducer/aggregateDataReducer";

export interface ReduxState {
    eventEngineSchema: EventEngineSchemaState,
    aggregateData: AggregateDataState
}

export const initialState = {
    eventEngineSchema: eventEngineSchemaInitialState,
    aggregateData: aggregateDataInitialState
};

export const reducer = combineReducers({
    eventEngineSchema: eventEngineSchemaReducer,
    aggregateData: aggregateDataReducer
});
