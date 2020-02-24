import React, {useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx";
import CheckoutPage from "./pages/checkout/checkout.jsx";

import {selectCurrentUser} from "./redux/user/user.selector";
import {CheckUserSession} from "./redux/user/user.action";

const App = ({ checkUserSession, currentUser}) => {
  // Depreciated! App now uses Hooks (useEffect)
  // Close subcription when auth.onAuthStateChanged
  // unmounts in order to prevent memory leaks
  // const unsubscribeFromAuth = null;

  // This behaves like component did mount. Fire checkUser session once
  // If there is a higher component than App, this effect can fire multiple
  // times
  useEffect(() => {
      checkUserSession();
    }, [checkUserSession]);

  // Depreciated! Previously used to store user data/state in App
  // componentDidMount() {
  //   checkUserSession()
  // }

  // Depreciated! Firebase: Unsubscribe from auth sevice when components
  // unmounts
  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();
  // }

    return (
      <div>
        <Header currentUser={currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin"
            render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    );
}

// Get user state for redirect
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// Dispatch passes whatever object it gets to every
// reducer
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(CheckUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
