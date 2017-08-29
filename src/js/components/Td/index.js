/**
 * Created by abaddon on 29.08.2017.
 */
import React, { PropTypes, Children } from 'react';

const Td = (props) => {
    const {colspan} = props;

    return (
        <td colSpan={colspan}>
            {Children.toArray(props.children)}
        </td>
    );
};

Td.propTypes = {
    colspan: PropTypes.number
};

export default Td;