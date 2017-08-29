/**
 * Created by abaddon on 29.08.2017.
 */
"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {makeSelectLocationState} from './utils/selecters';
import {createBrowserHistory} from 'history';
import App from './containers/App';
import StoreConfigure from './store';
import createRoutes from './routes';
import 'normalize.css';
import '../css/style.less';

const initialState = {};
// localStorage.clear();
const store = StoreConfigure(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: makeSelectLocationState(),
});

const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router
                history={history}
                routes={rootRoute}
            />
        </Provider>,
        document.getElementById('app')
    );
};

render();