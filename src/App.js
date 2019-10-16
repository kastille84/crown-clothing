import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component.js';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
//firebase
import {auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component {

  state={
    currentUser: null
  }

  unsubscribeFromAuth =  null;

  componentDidMount() {
    //user param is the curernt user state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth)=> {
      if(userAuth) {
        const userRef = await  createUserProfileDocument(userAuth);
        //we use it to check if db has updated at that ref with any new data
        //onSnapshot, simila to onAuthStateChange,
        // returns snapshotObj, aka data
        //onSnapshot is a subscription that listens to useRef for any changes to that data
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })        
      } else {
        //happends when userAuth is null, possibley sigining out
        //our state reflects it now
        this.setState({currentUser: userAuth})
      }
    })
  }
  componentWillUnmount() {
    //will close the subscription so no memory leaks
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header  currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
  
        </Switch>
      </div>
    );
  }
}

export default App;
