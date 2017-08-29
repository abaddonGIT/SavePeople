/**
 * Created by abaddon on 29.08.2017.
 */
import {getAsyncInjectors} from './utils/asyncInjectors';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err);
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    const {injectReducer} = getAsyncInjectors(store);

    return [
        {
            path: '/',
            name: 'home',
            getComponent(nextState, cb) {
                import('./containers/HomePage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                import('./containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}