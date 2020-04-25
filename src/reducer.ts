import {combineReducers} from 'redux';
import {
    SystemSchemaState,
    initialState as systemSchemaInitialState,
    reducer as systemSchemaReducer,
} from './reducer/systemSchemaReducer';
import {
    AggregateDataState,
    initialState as aggregateDataInitialState,
    reducer as aggregateDataReducer,
} from './reducer/aggregateDataReducer';
import {
    SnackbarState,
    initialState as snackbarInitialState,
    reducer as snackbarReducer,
} from './reducer/snackbarReducer';
import {
    SettingsState,
    initialState as settingsInitialState,
    reducer as settingsReducer,
} from './reducer/settingsReducer';
import {
    QueryState,
    initialState as queryInitialState,
    reducer as queryReducer,
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
