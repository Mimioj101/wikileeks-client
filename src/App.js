import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch, withRouter, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Switch> */}
      <Router>
        <Route path="/" render={() => <p>Hi</p>}/>
      </Router>
      {/* </Switch> */}
    </div>
  );
}

export default App;
