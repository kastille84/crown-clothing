import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component.js';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
//firebase
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

  state={
    currentUser: null
  }

  unsubscribeFromAuth =  null;

  componentDidMount() {
    let {setCurrentUser} = this.props;
    //user param is the curernt user state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth)=> {
      if(userAuth) {
        const userRef = await  createUserProfileDocument(userAuth);
        //we use it to check if db has updated at that ref with any new data
        //onSnapshot, simila to onAuthStateChange,
        // returns snapshotObj, aka data
        //onSnapshot is a subscription that listens to useRef for any changes to that data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })        
      } else {
        //happends when userAuth is null, possibley sigining out
        //our state reflects it now
        setCurrentUser( userAuth)
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
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
  
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps =  dispatch => ({
  setCurrentUser: (user)=> dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
