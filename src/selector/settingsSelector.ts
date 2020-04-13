import {ReduxState} from '../reducer';
import {createSelector} from 'reselect';

const stateKey = 'settings';

export const schemaUrlSelector = (state: ReduxState) => state[stateKey].schemaUrl;
export const messageBoxUrlSelector = (state: ReduxState) => state[stateKey].messageBoxUrl;
export const authenticationSelector = (state: ReduxState) => state[stateKey].authentication;
export const contextSelector = (state: ReduxState) => state[stateKey].context;
export const themeSelector = (state: ReduxState) => state[stateKey].theme;

export const makeSchemaUrlSelector = () => {
    return createSelector([schemaUrlSelector], schemaUrl => {
        return schemaUrl;
    });
};

export const makeMessageBoxUrlSelector = () => {
    return createSelector([messageBoxUrlSelector], messageBoxUrl => {
        return messageBoxUrl;
    });
};

export const makeAuthenticationSelector = () => {
    return createSelector([authenticationSelector], authentication => {
        return authentication;
    });
};

export const makeContextSelector = () => {
    return createSelector([contextSelector], context => {
        return context;
    });
};

export const makeThemeSelector = () => {
    return createSelector([themeSelector], theme => {
        return theme;
    });
};
