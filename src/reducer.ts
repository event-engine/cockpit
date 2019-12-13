import {combineReducers} from "redux";
import {
    reducer as eventEngineSchemaReducer,
    initialState as eventEngineSchemaInitialState,
    EventEngineSchemaState
} from './reducer/eventEngineSchemaReducer';

export interface ReduxState {
    eventEngineSchema: EventEngineSchemaState
}

export const initialState = {
    eventEngineSchema: eventEngineSchemaInitialState
};

export const reducer = combineReducers({
    eventEngineSchema: eventEngineSchemaReducer
});
