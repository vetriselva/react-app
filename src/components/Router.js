import React, {useState } from "react";
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Main from "./Main";
import firebase from 'firebase';
const AppRouter= () => {
    const [user, setuser] = useState(false)
    firebase.auth().onAuthStateChanged(function(userdata) {
        if (userdata) {
            setuser(true)
          } else {
            setuser(false)
          }
    });
   
    return(
        <Router>
            <Switch>
            <Route path="/" exact>
            <Login />
            </Route>
            <Route path="/signup">
            <Signup />
            </Route>
            <Route path="/main">
            { 
            user ?  <Main /> :<Login />
            }
            </Route>
           
        </Switch>
        </Router>
    )
    
}
export default AppRouter
