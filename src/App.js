import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Switch, withRouter, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import BookmarkContainer from './containers/BookmarkContainer.js'
import WikiContainer from './containers/WikiContainer.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'


class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar />
          <Route exact path="/" component={WikiContainer}/>
          <Route exact path="/bookmarks" component={BookmarkContainer}/>
        </Router>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default App;
