/**
 * Created by abaddon on 29.08.2017.
 */

import React, {PureComponent, PropTypes} from 'react';
import {Form, Text, FormError, Select, Textarea} from 'react-form';
import Button from '../Button';
import {getDaysOrMonth} from '../../utils/selecters';

class Popup extends PureComponent {
    constructor() {
        super();
    }

    /**
     * Сохранение данных с формы
     * @param values
     */
    submitFormHandler = (values) => {
        const birthday = `${values.day}.${values.month}.${values.year}`;
        let result = {};
        for (let field in Popup.defFields) {
            result[field] = values[field];
        }
        result.birthday = birthday;
        const {saveHandler, closeHandler} = this.props;
        saveHandler(result);
        closeHandler();
    };

    static defFields = {
        fullName: '',
        address: '',
        city: '',
        phone: '',
        birthday: '',
        uid: ''
    };

    /**
     * Валидация полей
     * @param values
     * @return {{fullName: *}}
     */
    validateHandler = (values) => {
        const {fullName, phone, day, month, year} = values;
        return {
            day: !day ? 'Поле обязательно для заполнения!' : undefined,
            month: !month ? 'Поле обязательно для заполнения!' : undefined,
            year: !year ? 'Поле обязательно для заполнения!' : undefined,
            fullName: !fullName ? 'Поле обязательно для заполнения!' : fullName.length > 100 ? 'Слишком длинный текст!' : undefined,
            phone: !phone ? 'Неверный формат номера' : !phone.match(/((8|\+7)-?)?\(?\d{3}\)?-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}/g) ? 'Неверный формат номера' : undefined
        }
    };

    /**
     * Формирует предъустановки для формы
     */
    getDefaultValue = (user) => {
        const date = user.get('birthday').split('.');
        let out = {};
        for (let key in Popup.defFields) {
            out[key] = user.get(key) || undefined;
        }
        out.day = +date[0].charAt(0) === 0 ? date[0] : +date[0];
        out.month = +date[1].charAt(0) === 0 ? date[1] : +date[1];
        out.year = +date[2];
        return out;
    };

    render() {
        const {user, closeHandler} = this.props;
        let fields = {};
        if (user) {
            fields = this.getDefaultValue(user);
            console.log(fields);
        }

        return (
            <div className="popup">
                <div className="popup__form">
                    <a className="popup__close" onClick={closeHandler}><img src="./img/delete.png" alt=""/></a>
                    <div className="clear" />
                    <Form
                        defaultValues={fields}
                        onSubmit={this.submitFormHandler}
                        validate={this.validateHandler}
                    >
                        {({submitForm}) => {
                            return (
                                <form className="form" onSubmit={submitForm}>
                                    <Text type="hidden" field='uid'/>
                                    <div className="form__row">
                                        <Text type="text" field='fullName' placeholder="Ф.и.о *"/>
                                    </div>
                                    <div className="form__group">
                                        <div className="form__row">
                                            <Select
                                                placeholder='День'
                                                field='day'
                                                options={getDaysOrMonth(1, 31)}
                                            />
                                        </div>
                                        <div className="form__row">
                                            <Select
                                                placeholder='Месяц'
                                                field='month'
                                                options={getDaysOrMonth(1, 12)}
                                            />
                                        </div>
                                        <div className="form__row">
                                            <Select
                                                placeholder='Год'
                                                field='year'
                                                options={getDaysOrMonth(1945, 2017)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form__row">
                                        <Text type="text" placeholder="Адрес" field="address"/>
                                    </div>
                                    <div className="form__row">
                                        <Text type="text" field='city' placeholder="Город"/>
                                    </div>
                                    <div className="form__row">
                                        <Text type="text" field='phone' placeholder="Телефон"/>
                                    </div>
                                    <div className="form__row">
                                        <Button>Сделать мир лучше</Button>
                                    </div>
                                </form>
                            )
                        }}
                    </Form>
                </div>
            </div>
        );
    }
}

Popup.propTypes = {
    user: PropTypes.object,
    closeHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
};

export default Popup;