import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore, compose} from 'redux';
import {reducer, initialState} from './reducer';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {Router, Redirect, Route, Switch} from 'react-router';
import theme from './material-ui/theme';
import DashboardPage from './DashboardPage';
import AggregatesPage from './AggregatesPage';
import {aggregateDetailsPath, aggregatePath, dashboardPath} from './routes';
import MainLayout from './layout/MainLayout';
import AggregateDetailsPage from './AggregateDetailsPage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import {fetchSystemSchema} from './action/systemSchemaCommands';
import SnackbarStack from './SnackbarStack';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
store.dispatch(fetchSystemSchema({ }));

const history = createHashHistory();

const Main = () => (
    <Switch>
        <Route path={dashboardPath} exact={true} component={DashboardPage} />
        <Route path={aggregatePath} exact={true} component={AggregatesPage} />
        <Route path={aggregateDetailsPath} exact={true} component={AggregateDetailsPage} />
        <Redirect from={'/'} to={dashboardPath} />
    </Switch>
);

ReactDOM.render((
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <MainLayout>
                    <Main/>
                </MainLayout>
            </Router>
            <SnackbarStack />
        </ThemeProvider>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
