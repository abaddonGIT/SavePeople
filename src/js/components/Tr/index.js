/**
 * Created by abaddon on 29.08.2017.
 */
import React, {PureComponent, PropTypes} from 'react';
import Td from '../Td';
import {getSortRow} from '../../utils/selecters';

class Tr extends PureComponent {

    /**
     * Удалить пользователя
     */
    deleteHandler = () => {
        const {uid, deleteHandler} = this.props;
        deleteHandler(uid);
    };

    /**
     * Открыть окно редактирования
     */
    editHandler = () => {
        const {user, editHandler} = this.props;
        editHandler(user);
    };

    render() {
        const {empty, user} = this.props;
        let rows = [];

        if (empty) {
            rows = <Td colspan={7}>Все очень плохо</Td>;
        } else {
            let uid = user.get('uid');
            const row = getSortRow(user);

            for (let key in row) {
                if (key !== 'uid') {
                    rows.push(<Td key={key} colspan={1}>{row[key]}</Td>)
                }
            }

            rows.push(<Td key="edit"><a onClick={this.editHandler}><img src="./img/edit.png" alt=""
                                                                        title="Редактировать"/></a></Td>);
            rows.push(<Td key="delete"><a onClick={this.deleteHandler}><img src="./img/delete.png" alt=""
                                                                            title="удалить"/></a></Td>);
        }

        return (
            <tr>
                {rows}
            </tr>
        );
    }
}

Tr.propTypes = {
    empty: PropTypes.bool,
    user: PropTypes.object,
    editHandler: PropTypes.func,
    deleteHandler: PropTypes.func
};

export default Tr;