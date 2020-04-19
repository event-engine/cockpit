import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, compose, createStore} from 'redux';
import {initialState, reducer} from './reducer';
import rootSaga from './saga/rootSaga';
import { persistStore } from 'redux-persist';
import {fetchSystemSchema} from './action/systemSchemaCommands';
import {defaultEeUiConfig} from './defaultEeUIConfig';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    initialState as any,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store as any, {}, () => {
    store.dispatch(fetchSystemSchema({ }));
});

if (defaultEeUiConfig.environment === 'development') {
    persistor.purge();
}

sagaMiddleware.run(rootSaga);
