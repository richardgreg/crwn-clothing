import React from "react";
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

class App extends React.Component {
  // Close subcription when auth.onAuthStateChanged
  // unmounts in order to prevent memory leaks
  unsubscribeFromAuth = null;

  // Store user data/state in App
  componentDidMount() {

    // Listen to authentication state changes
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth){
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       });
    //     });
    //   }
    //   setCurrentUser(userAuth);
      //console.log(userAuth);
      // Instead of passing the full array (collectionsArray), pass in a new
      // array where you get the title and object
    // });
  }

  // Firebase: Unsubscribe from auth sevice when components
  // unmounts
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.props.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin"
            render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}
          />
        </Switch>
      </div>
    );
  }
}

// Get user state for redirect
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// Dispatch passes whatever object it gets to every
// reducer

export default connect(mapStateToProps)(App);
