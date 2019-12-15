import React from "react";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {signInWithGoogle} from "../../firebase/firebase.utils";

import "./sign-in.scss";

class SignIn extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: ""
    }  
  }
  handleSubmit = (event) => {
    event.preventDefualt();

    this.setState({ email: "", password: "" })
  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="password"
            required
          />
          <CustomButton type="submit">Sign in</CustomButton><br/><br/>
          <CustomButton onClick={signInWithGoogle}>
            {" "}
            Sign in with Google{" "}
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;