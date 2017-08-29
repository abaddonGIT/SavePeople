/**
 * Created by abaddon on 29.08.2017.
 */
import _transit from 'transit-immutable-js';
/**
 * Получаем данные из localStorage
 */
const loadState = () => {
    try {
        const json = localStorage.getItem('state');
        if (!json) {
            return undefined;
        }
        return _transit.fromJSON(json);
    } catch (err) {
        return undefined;
    }
};

/**
 * Сохраняем данные в localStorage
 * @param state
 */
const saveState = (state) => {
    // console.log(state.toJS());
    try {
        const json = _transit.toJSON(state);
        localStorage.setItem('state', json);
    } catch (err) {
        console.error('Ошибка при преобразовании данных ав json!');
    }
};

export {
    loadState,
    saveState
};