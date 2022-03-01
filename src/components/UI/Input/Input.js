import React from 'react';

const Input = (props) => {
    return (
        <React.Fragment>
            <label htmlFor={props.for}>{props.label}</label>
          <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChangeHandler}
            onBlur={props.onBlurHandler}
          />
        </React.Fragment>
    )
};

export default Input;