import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { signIn } from "@ducks/auth/routines";
import { getAuthIsLoading } from "@ducks/auth/selector";
import CustomInput from "@commonComponents/customInput/CustomInput";
import "./signInForm.css";

const SignInForm = () => {
  const isLoading = useSelector(getAuthIsLoading);
  const dispatch = useDispatch();

  const onSubmit = (user) => {
    dispatch(signIn(user));
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form className="sign-form" onSubmit={handleSubmit}>
          <div className="sign-form__sf-input">
            <div className="sf-input__container">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                title={"Email"}
                component={CustomInput}
              />
            </div>
            <span className="sf-input__icon">
              <FontAwesomeIcon className="icon icon-user" icon={faUser} />
            </span>
          </div>
          <div className="sign-form__sf-input">
            <div className="sf-input__container">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                title={"Password"}
                component={CustomInput}
              />
            </div>
            <span className="sf-input__icon">
              <FontAwesomeIcon className="icon icon-lock" icon={faLock} />
            </span>
          </div>
          <button type="submit" disabled={isLoading}>
            Sign In
          </button>
          <div className="sign-form__forgotten">
            <Link to="/forgotpassword">Forgotten password?</Link>
          </div>
        </form>
      )}
    />
  );
};

SignInForm.propTypes = {};

export default SignInForm;
