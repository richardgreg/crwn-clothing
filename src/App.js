import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./App.css";

import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx";
import { auth, createUserProfileDocument} from "./firebase/firebase.utils";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  // Close subcription when auth.onAuthStateChanged
  // unmounts in order to prevent memory leaks
  unsubscribeFromAuth = null;

  // Store user data/state in App
  componentDidMount() {
    // Listen to authentication state changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
          console.log(this.state);
        });
      }
      else{
        this.setState({currentUser: userAuth});
      }
    });
  }

  // Firebase: Unsubscribe from auth sevice when components
  // unmounts
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
