import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Switch, withRouter, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import BookmarkContainer from './containers/BookmarkContainer.js'
import WikiContainer from './containers/WikiContainer.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import SearchForm from './components/SearchForm.js'


class App extends React.Component {

  state = {
    user: "",
    searchedWikis: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(userData => {
          this.setState(() => ({
            user: userData.user
          }))
        })
      } else {
        console.log('Log in yo')
        // after you set state, do this.props.history.push('/home') for login and signup
    }
  }
  
  
  loginHandler = (userInfo) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"},
      body: JSON.stringify({user: userInfo})
      }
    fetch("http://localhost:3000/api/v1/login", configObj)
    .then(resp => resp.json())
    .then(userData => {
      localStorage.setItem("token", userData.jwt);
      this.setState(() => ({
        user: userData.user
      })
              // after you set state, do , this.props.history.push('/home') for login and signup

      )
    })
  }


  signupHandler = (userInfo) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"},
      body: JSON.stringify({user: userInfo})
      }
    fetch("http://localhost:3000/api/v1/users", configObj)
    .then(resp => resp.json())
    .then(userData => {
      localStorage.setItem("token", userData.jwt);
      this.setState(() => ({
        user: userData.user
      })
                    // after you set state, do , this.props.history.push('/home') for login and signup
      )
    })
  }

  searchHandler = (searchTerm) => {
    let banana = searchTerm.split(" ").join("%20")
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=30&srsearch=${banana}&utf8=&format=json`)
    .then(resp => resp.json())
    .then(data => 
      this.setState({searchedWikis: data["query"]["search"]})
    )
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar />
          <Route exact path="/" render={() => (
            <div>
              <br/>
              <SearchForm searchHandler={this.searchHandler}/>
              <WikiContainer wikis={this.state.searchedWikis}/>
            </div>
          )}/>
          <Route exact path="/bookmarks" component={BookmarkContainer}/>
        </Router>
        <Login loginHandler={this.loginHandler}/>
        <Signup signupHandler={this.signupHandler}/>
      </div>
    );
  }

}

// withRouter(app)
export default App;
