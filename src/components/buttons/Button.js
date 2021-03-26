import React from 'react';
import './Button.css';

const whichStyle = (val) => {
    switch (val) {
        case '0': {
            return 'extra';
        }
        default: { return 'btn'; }

    }
}

const Button = (props) => {
    return (
        <div className={`${whichStyle(props.value)}`} onClick={() => props.handlerClick(props.value)}>
            {props.content}
        </div>
    );
}

export default Button;