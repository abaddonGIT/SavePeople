/**
 * Created by abaddon on 29.08.2017.
 */
import {createSelector} from 'reselect';
const selectGlobal = (state) => state.get('global');

const makeSelectUsers = () => createSelector(
    selectGlobal,
    (selectGlobal) => selectGlobal.getIn(['users'])
);

/**
 * Показывает где тусит пользователь в данный момент
 * @returns {function(*)}
 */
const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

/**
 * Список дней
 * @returns {Array}
 */
const getDaysOrMonth = (offset, limit) => {
    let days = [];
    for (let i = offset; i <= limit; i++) {
        const val = String(i).length > 1 ? i : `0${i}`;
        days.push({
            label: val,
            value: val
        });
    }

    return days;
};

/**
 * Сортирует объект в нужном порядке
 * @param source
 * @returns {{}}
 */
const getSortRow = (source) => {
    let out = {};
    const obj = source.toJS();

    Object.keys(obj).sort().forEach(function (key) {
        const value = obj[key];
        delete obj[key];
        out[key] = value;
    });
    return out;
};

export  {
    makeSelectLocationState,
    makeSelectUsers,
    getDaysOrMonth,
    getSortRow
};