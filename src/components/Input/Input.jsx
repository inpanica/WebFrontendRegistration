import React from 'react';
import './Input.less'

const Input = (props) => {
    return (
        <input onChange={(event) => props.setValue(event.target.value)} 
        type={props.type} 
        placeholder={props.placeholder} 
        value={props.value} 
        className={[props.className, 'input'].join(' ')}/>
    );
};

export default Input;