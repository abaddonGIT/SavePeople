/**
 * Created by abaddon on 29.08.2017.
 */
import StyledButton from './StyledButton';
import React, { PropTypes, Children } from 'react';

const Button = (props) => {
    return (
        <StyledButton onClick={props.onClick}>
            {Children.toArray(props.children)}
        </StyledButton>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Button;