import React, { useRef, useImperativeHandle } from "react";

// useImperativeHandle allows us to by pass having to use states/props and controlled components, it allows us to use certain functionalities such as refs, directly calling or manipulating something in the component programatically, best not to abuse this feature.
import classes from "./Input.module.css";

// SURPRISE you can accept a second argument here. that will help use the useImperativeHandle hook: ref, this ref will alow us to bind the values to the Login()
// the very last step is to export the component function in the forwardRef() method
// this made the Input() component able to bind to a ref!
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // as we learned before the function inside of use effect will run after the component render cycle.
  // useEffect(() => {
  //   // the focus method is a method available on the input dom object, that we can access through through ref
  //   inputRef.current.focus()
  // }, []);
  // empty array means run only once after the first time
  // when we run it it will focus the password input because it is the last input being rendered. but this is not what we want at the moment. so we will comment it out.

  const activate = () => {
    inputRef.current.focus();
  };
  // this will be a rare cenario in which this function will not be called from inside the input but from outside, we shouldnt always do this, but this scenario is special.
  // we are doing this because we want the focus method to be called on our Input() component like we can on the real dom input component

  useImperativeHandle(ref, () => {
    // this hook will return an object with functionalities or values we want to "expose". These internal functions or valiable are going be available to access from the outside. for example in the case below we are exposing the activate() function.
    // this is essencial a translation function 
    return {
      focus : activate
    };
  });

  return (
    <div
      className={`${classes.control} ${
        // emailIsValid === false ? classes.invalid : ""
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
