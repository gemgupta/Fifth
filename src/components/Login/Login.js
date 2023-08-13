import React, { useState, useReducer, useRef, useContext } from "react";
import Input from "../UI/input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/Context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
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
const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPass] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegestate, dispatchcollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });
  // const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const collegeInputRef = useRef();
  const passwordInputRef = useRef();
  // useEffect(() => {
  //   const identifeir = setTimeout(() => {
  //     // console.log('1')
  //     setFormIsValid(
  //       enteredEmail.includes("@") &&
  //         enteredPassword.trim().length > 6 &&
  //         enteredCollege.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     // console.log('2')
  //     clearTimeout(identifeir);
  //   };
  // }, [enteredCollege, enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collegestate.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        collegestate.isValid &&
        event.target.value.trim().length > 6
    );
  };
  const collegeChangeHandler = (event) => {
    dispatchcollege({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.trim().length > 6 &&
        emailState.isValid &&
        passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" });
  };
  const validateCollegeHandler = () => {
    dispatchcollege({ type: "INPUT_BLUR" });
  };
  const ctx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, collegestate.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else if (!collegestate.isValid) {
      collegeInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={collegeInputRef}
          id="college"
          label="college"
          type="college"
          isValid={collegestate.isValid}
          value={collegestate.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
