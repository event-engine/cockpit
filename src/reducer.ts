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
import {
    reducer as settingsReducer,
    initialState as settingsInitialState,
    SettingsState,
} from './reducer/settingsReducer';

export interface ReduxState {
    systemSchema: SystemSchemaState;
    aggregateData: AggregateDataState;
    snackbar: SnackbarState;
    settings: SettingsState;
}

export const initialState = {
    systemSchema: systemSchemaInitialState,
    aggregateData: aggregateDataInitialState,
    snackbar: snackbarInitialState,
    settings: settingsInitialState,
};

export const reducer = combineReducers({
    systemSchema: systemSchemaReducer,
    aggregateData: aggregateDataReducer,
    snackbar: snackbarReducer,
    settings: settingsReducer,
});
