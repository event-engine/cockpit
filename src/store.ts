import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import {initialState, reducer} from './reducer';
import rootSaga from './saga/rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {fetchSystemSchema} from './action/systemSchemaCommands';
import {config} from './config';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['settings'],
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store as any, {}, () => {
    store.dispatch(fetchSystemSchema({ }));
});

if (config.environment === 'development') {
    persistor.purge();
}

sagaMiddleware.run(rootSaga);
