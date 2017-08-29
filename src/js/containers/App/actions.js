/**
 * Created by abaddon on 29.08.2017.
 */
import {
    ADD_USER,
    DELETE_USER,
    CHANGE_USER
} from './constants';

/**
 * Добавление пользователя
 * @param user
 * @returns {{type, name}}
 */
export function addUser(user) {
    return {
        type: ADD_USER,
        user,
    };
}

/**
 * Удаление пользователя
 * @param uid
 * @return {{type, uid: *}}
 */
export function deleteUser(uid) {
    return {
        type: DELETE_USER,
        uid
    }
}

/**
 * Редактирование пользователя
 * @param user
 * @returns {{type, user: *}}
 */
export function changeUser(user) {
    return {
        type: CHANGE_USER,
        user
    }
}

