import React from 'react'
import './Button.less'

const Button = ({children, ...props}) =>{
    return(
        <button {...props} className={[props.className, 'button btn-7'].join(' ')} type='button'>
            <span>{children}</span>
        </button>
    );
};

export default Button;