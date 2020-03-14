import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore, compose} from 'redux';
import {reducer, initialState} from './reducer';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {SnackbarProvider} from 'notistack';
import {Router, Redirect, Route, Switch} from 'react-router';
import theme from './material-ui/theme';
import {getEventEngineSchema} from './api';
import {updateRawSchema} from './reducer/eventEngineSchemaReducer';
import DashboardPage from './DashboardPage';
import AggregatesPage from './AggregatesPage';
import {aggregateDetailsPath, aggregatePath, dashboardPath} from './routes';
import MainLayout from './layout/MainLayout';
import { monaco } from '@monaco-editor/react';
import AggregateDetailsPage from './AggregateDetailsPage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

getEventEngineSchema()
    .then(eventEngineSchema =>
        store.dispatch(updateRawSchema({ rawSchema: eventEngineSchema })),
    );

const history = createHashHistory();

/*monaco
    .init()
    .then(monaco => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                fileMatch: ['foo.json'], // associate with our model
                schema: {
                    type: "object",
                    properties: {
                        p1: {
                            enum: ["v1", "v2"]
                        }
                    },
                    additionalProperties: false
                }
            }],
        });
    })
    .catch(error => console.error('An error occurred during initialization of Monaco: ', error));*/

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
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3500}>
                <Router history={history}>
                    <MainLayout>
                        <Main/>
                    </MainLayout>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
