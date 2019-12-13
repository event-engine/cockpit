import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import reducer, {initialState} from "./reducer";
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {SnackbarProvider} from 'notistack';
import {Router, Redirect, Route, Switch} from 'react-router';
import theme from './material-ui/theme';

const store = createStore(
    reducer,
    initialState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const history = createHashHistory();

const Main = () => (
    <Switch>
        <Route path={'/aggregates'} exact={true} component={App} />
        <Redirect from={'/'} to={'/aggregates'} />
    </Switch>
);

ReactDOM.render((
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3500}>
                <Router history={history}>
                    <Main/>
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
