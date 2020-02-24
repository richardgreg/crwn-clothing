import React, {useState} from "react";
import {connect} from "react-redux";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {googleSignInStart, emailSignInStart} from "../../redux/user/user.action";

import "./sign-in.scss";

const SignIn = ({emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;


  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const {value, name} = event.target;

    setCredentials({...userCredentials, [name]: value});
  }

    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            label="password"
            required
          />
          <div className="button">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  // dispatch email and password and pass them in as object where the keys go to the values
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);