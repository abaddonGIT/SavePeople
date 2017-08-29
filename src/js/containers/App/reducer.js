/**
 * Created by abaddon on 29.08.2017.
 */
import {fromJS} from 'immutable';
import uuidv4 from 'uuid/v4';

import {
    ADD_USER,
    DELETE_USER,
    CHANGE_USER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    users: false
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return addUser(action.user, state);
        case DELETE_USER:
            return  deleteUser(action.uid, state);
        case CHANGE_USER:
            return changeUser(action.user, state);
        default:
            return state;
    }
}

export default appReducer;

/**
 * Обновление пользователя
 * @param user
 * @param state
 */
const changeUser = (user, state) => {
    const users = state.get('users').map((item) => {
        if (item.get('uid') === user.uid) {
            return fromJS(user);
        } else {
            return item;
        }
    });
    return state.set('users', users);
};

/**
 * Удаление пользователя
 * @param uid
 * @param state
 */
const deleteUser = (uid, state) => {
    const users = state.get('users').filter((user) => {
        return user.get('uid') !== uid;
    });
    return state.set('users', users.size ? users : false);
};

/**
 * Добавляет пользователя к списку
 * @param user
 * @param state
 * @returns {any|*}
 */
const addUser = (user, state) => {
    let newState = state.toJS();
    user.uid = uuidv4();
    if (!newState.users) {
        newState.users = [];
        newState.users.push(user);
    } else {
        newState.users.push(user);
    }
    state = fromJS(newState);
    return state;
};