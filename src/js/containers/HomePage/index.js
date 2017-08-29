/**
 * Created by abaddon on 28.08.2017.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser, changeUser, deleteUser} from '../../containers/App/actions';
import {createStructuredSelector} from 'reselect';
import {makeSelectUsers} from '../../utils/selecters';
import H1 from '../../components/H1';
import Wrap from '../../components/Wrap';
import Tr from '../../components/Tr';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import Thead from '../../components/Thead';


class HomePage extends PureComponent {
    constructor() {
        super();
        this.state = {
            popup: false,
            user: null
        };
    }

    componentDidMount() {

    }

    /**
     * Добавляем пользователя
     */
    addUserHandler = () => {
        this.setState({popup: true, user: null});
    };

    /**
     * Закрывает окно создания - редактирования
     */
    closePopupHandler = () => {
        this.setState({popup: false, user: null});
    };

    /**
     * Отрывает окно на редактирование
     * @param user
     */
    openEditPopup = (user) => {
        this.setState({popup: true, user: user});
    };

    render() {
        const {list, addUser, changeUser, deleteUser} = this.props;
        const {popup, user} = this.state;

        let users = [];
        if (!list) {
            users = <Tr empty={true}/>;
        } else {
            list.map((item) => {
                users.push(<Tr
                    key={item.get('uid')}
                    uid={item.get('uid')}
                    user={item}
                    deleteHandler={deleteUser}
                    editHandler={this.openEditPopup}
                />)
            });
        }

        return (
            <Wrap>
                <H1>
                    Демографическая ситуация:
                    <Button onClick={this.addUserHandler}>Исправить ситуацию!</Button>
                </H1>
                <table>
                    <Thead/>
                    <tbody>
                    {users}
                    </tbody>
                </table>
                {popup &&
                <Popup
                    user={user}
                    closeHandler={this.closePopupHandler}
                    saveHandler={user === null ? addUser : changeUser}
                />
                }
            </Wrap>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        changeUser: bindActionCreators(changeUser, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch)
    }
}

const mapStateToProps = createStructuredSelector({
    list: makeSelectUsers()
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);