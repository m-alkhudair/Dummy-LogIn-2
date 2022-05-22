import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../store/auth-context";

// Note we created the func outside the component func. becuase the reducer func doesn't need any data defined inside the component
const emailReducer = (state, action) => {
  // the state arg. is the initial state that it brings from the useReducer() func, where it was defined as an argument(2nd arg). which is stored in the emailState snapshot.

  // Checkout emailChangeHandler()
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    // "state" is guarnteed to be the absolute last state snapshot
    return { value: state.value, isValid: state.value.includes("@") };
  }

  // We will then return a new state, can be any data type (not sure) but we're using an obj. which will be the new emailState snapshot
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // We made a reducer to handle everything related to the email (first two states)
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // The code for the form validity using only useState is not optimal, because it relays on OTHER states, so we will use useEffect along side. after updating it use the new code used in useReducer.

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    // make initial value null, because if it was false it will be treaded as invalid from the start (red input field)
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  // using refs:
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // Now we are presented with another problem with code block below. The validity check will keep running every time the passwordState obj changes, even if the email and password inputted were already valid. To solve this issue we will use OBJECT Destructuring:
  // similar to array destructuring, and we will the ALIAS syntax. isValid is the property name, and on the right of it the alias. This is an alias assignment NOT a value assignment
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // This will guarantee it will re-run(with the lates state values) despite its dependency on other states
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // the cleanup function runs before every new side effect funcitin execution, and before the component is removed. but is does not run befoe the very first time.
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier); //this is to clear the timer. to allow our form validation to pause for 500 ms after a user stops typing. clearing the timer before setting a new one. this way we prevent thing like updating the state too frequently or sending too many http request causing unnecessary network traffic
    };
    // Dependencies should be matched by the values and other way arround.
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    // To dispatch our action, type is the identifier and val is the payload. This is the convenstion in writing this
    // This function will TRIGGER the emailReducer function to execute! This will be dispatched the second argument of the emailReducer() function, the action argument.
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // event.target.value.includes("@") && enteredPassword.trim().length > 6
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   // enteredEmail.includes("@") && event.target.value.trim().length > 6
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
    // Note in the dispatch func we didnt need to add a payload. plus the val property will only be evaluated for type: 'USER_INPUT'. chech the dipatchEmail function definition
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    // This validation logic will be moved to the dispatch function
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    // props.onLogin(emailState.value, passwordState.value);

    // authCtx.onLogin(emailState.value, passwordState.value);
    // adding the form validation:
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      // to check first if the email is valid, because if not we will highlight the email field. then if it is but the passward is invalid we will highlight the passward field
      // for this to work we need to go back to Input.js and import the useImperatibeHandle hook
      emailInputRef.current.focus();
      // the focue() function is not the built in one its defined in Input.js
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ""
            emailState.isValid === false ? classes.invalid : ""
          }`}
        > */}
        {/* <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          /> */}
        <Input
          ref={emailInputRef} //this wont work by itself because ref is only for real dom elements and its also a reserved name even if we use props. 
          // We've set it up to work in Input.js
          label="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailIsValid}
        />
        {/* </div> */}
        {/* <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ""
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        > */}
        {/* <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          /> */}
        <Input
          ref={passwordInputRef} //this wont work by itself because ref is only for real dom elements and its also a reserved name
           // We've set it up to work in Input.js
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordIsValid}
        />
        {/* </div> */}
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            // disabled={!formIsValid} //disabling the disable prop. to make the button always clickable. we will now add form validation to the submit handler
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
