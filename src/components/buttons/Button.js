import React from 'react';
import './Button.css';

const chooseStyle = (val) => {
    switch (val) {
        case 'C':
        case '+/-':
        case '%': {
            return 'width-normal text-with-opacity';
        }
        case '0': {
            return 'width-extra';
        }
        case '=': {
            return 'width-normal bg-zero'
        }
        default: {
            return 'width-normal';
        }
    }
}


const Button = (props) => {
    return (
        <div className={`btn ${chooseStyle(props.value)}`} onClick={() => props.handlerClick(props.value)}>
            {props.value}
        </div>
    );
}

export default Button;