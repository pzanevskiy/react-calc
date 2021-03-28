import React from 'react';
import './Button.css';

const whichStyle = (val) => {
    switch (val) {
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
        <div className={`btn ${whichStyle(props.value)}`} onClick={() => props.handlerClick(props.value)}>
            {props.content}
        </div>
    );
}

export default Button;