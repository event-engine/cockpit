import {combineReducers} from 'redux';
import {
    reducer as systemSchemaReducer,
    initialState as systemSchemaInitialState,
    SystemSchemaState,
} from './reducer/systemSchemaReducer';
import {
    reducer as aggregateDataReducer,
    initialState as aggregateDataInitialState,
    AggregateDataState,
} from './reducer/aggregateDataReducer';
import {
    reducer as snackbarReducer,
    initialState as snackbarInitialState,
    SnackbarState,
} from './reducer/snackbarReducer';

export interface ReduxState {
    systemSchema: SystemSchemaState;
    aggregateData: AggregateDataState;
    snackbar: SnackbarState;
}

export const initialState = {
    systemSchema: systemSchemaInitialState,
    aggregateData: aggregateDataInitialState,
    snackbar: snackbarInitialState,
};

export const reducer = combineReducers({
    systemSchema: systemSchemaReducer,
    aggregateData: aggregateDataReducer,
    snackbar: snackbarReducer,
});
