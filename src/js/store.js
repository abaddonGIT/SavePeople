/**
 * Created by abaddon on 29.08.2017.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createReducer from './reducers';
import {fromJS} from 'immutable';
import _throttle from 'lodash/throttle';
import {loadState, saveState} from './utils/localStorage';

export default function StoreConfigure(initialState = {}, history) {
    const middlewares = [
        routerMiddleware(history),
    ];

    initialState = fromJS({global: loadState()});

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers)
    );

    store.asyncReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            import('./reducers').then((reducerModule) => {
                const createReducers = reducerModule.default;
                const nextReducers = createReducers(store.asyncReducers);

                store.replaceReducer(nextReducers);
            });
        });
    }

    store.subscribe(_throttle(() => {
        saveState(store.getState().get('global'));
    }, 1000));

    return store;
}