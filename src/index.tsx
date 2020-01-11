import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
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
import {aggregatePath, dashboardPath} from './routes';
import MainLayout from './layout/MainLayout';

const store = createStore(
    reducer,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

getEventEngineSchema()
    .then(eventEngineSchema =>
        store.dispatch(updateRawSchema({ rawSchema: eventEngineSchema })),
    );

const history = createHashHistory();

const Main = () => (
    <Switch>
        <Route path={dashboardPath} exact={true} component={DashboardPage} />
        <Route path={aggregatePath} component={AggregatesPage} />
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
