import React from "react";
import {connect} from "react-redux";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import {googleSignInStart, emailSignInStart} from "../../redux/user/user.action";

import "./sign-in.scss";

class SignIn extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: ""
    }  
  }
  handleSubmit = async event => {
    event.preventDefault();
    const {emailSignInStart} = this.props;
    const {email, password} = this.state;

    emailSignInStart(email, password);
  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {googleSignInStart} = this.props;
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
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  // dispatch email and password and pass them in as object where the keys go to the values
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);