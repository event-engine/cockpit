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
import {
    reducer as queryReducer,
    initialState as queryInitialState,
    QueryState,
} from './reducer/queryReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const settingsPersistConfig = {
    key: 'settings',
    storage,
    whitelist: ['schemaUrl', 'messageBoxUrl', 'context', 'theme'],
};

export interface ReduxState {
    systemSchema: SystemSchemaState;
    aggregateData: AggregateDataState;
    snackbar: SnackbarState;
    settings: SettingsState;
    query: QueryState;
}

export const initialState: ReduxState = {
    systemSchema: systemSchemaInitialState,
    aggregateData: aggregateDataInitialState,
    snackbar: snackbarInitialState,
    settings: settingsInitialState,
    query: queryInitialState,
};

const rootReducer = combineReducers({
    systemSchema: systemSchemaReducer,
    aggregateData: aggregateDataReducer,
    snackbar: snackbarReducer,
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    query: queryReducer,
});

export const reducer = persistReducer(
    persistConfig,
    rootReducer,
);
