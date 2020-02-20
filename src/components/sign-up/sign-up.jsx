import React from "react";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import "./sign-up";

class SignUp extends React.Component{
  constructor(){
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  };

  // For handling new user datails submission
  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if(password !== confirmPassword) {
      alert("password do not match");
      return;
    };

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, {displayName});

      //this clears our form
      this.state({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {
      console.error(error);
    };
  };

  handleChange = event => {
    const { name, value } = event.target;

    // Dynamically set name value to value value
    this.setState({[name]: value});
  }

  render(){
    const {displayName, email, password, confirmPassword} = this.state;
    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type="submit" >SIGN UP</CustomButton>
        </form>
      </div>
    );
  };
};

export default SignUp;
