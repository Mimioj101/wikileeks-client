import React from 'react';
import './App.css';
import { Switch, withRouter, Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/NavBar'
import BookmarkContainer from './containers/BookmarkContainer.js'
import WikiContainer from './containers/WikiContainer.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import SearchForm from './components/SearchForm.js'


class App extends React.Component {

  state = {
    user: "",
    searchedWikis: [],
    bookmarkedWikis: []
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
          this.setState(
            () => ({user: userData.user}),
            () => this.props.history.push('/')
          )
        })
      } else {
        this.props.history.push('/login')
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
      this.setState(
        () => ({user: userData.user}),
        () => this.props.history.push('/')
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
      this.setState(
        () => ({user: userData.user}),
        () => this.props.history.push('/')
      )
    })
    // POST fetch a folder
  }

  searchHandler = (searchTerm) => {
    let banana = searchTerm.split(" ").join("%20")
    fetch(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=30&srsearch=${banana}&utf8=&format=json`)
    .then(resp => resp.json())
    .then(data => 
      this.setState({searchedWikis: data["query"]["search"]})
    )
  }

  postWiki = (wiki) => {
      let wikiObj = {
        page_id: wiki.pageid, 
        page_title: wiki.title,
        snippet: wiki.snippet}
     let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify(wikiObj)
     }
     fetch("http://localhost:3000/api/v1/wikis", options)
     .then(resp => resp.json())
     .then(wiki => this.postBookmark(wiki))
  }

  postBookmark = (wiki) => {
    let bookmarkObj = {
      user_id: this.state.user.id,
      wiki_id: wiki["wiki"]["id"],
      folder_id: 2
      // if you POST a folder in signup handler, this will need to be dynamic
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(bookmarkObj)
    }
    fetch("http://localhost:3000/api/v1/bookmarks", options)
    .then(resp => resp.json())
    .then(data => {
      console.log("did you post a bookmark, son?", data)
    })
  }

  bookmarkHandler = (wiki) => {
    // if (this.state.user.my_wikis.includes(wiki)) {
      // compare this.state.user.my_wikis.page_id to wiki.pageid
      console.log("DELETE IT, KILL IT WITH FIRE", wiki)
      // DELETE & setState
    // } else {
      let newArray = [...this.state.bookmarkedWikis]
      newArray.push(wiki)
      this.setState({bookmarkedWikis: newArray})
      this.postWiki(wiki)
      // setState
  //  }
  }

  renderNavBar = () => {
    if (this.state.user) {
      return <NavBar/>
    } else {
      return null
    }
  }

  redirectHandlerSignup = () => (
    console.log("take me to login")
    // this.props.history.push('/login')
)

  redirectHandlerLogin = () => (
    console.log("take me to signup")
    // this.props.history.push('/signup')
  )

  render() {
    // console.log("state in App.js", this.state.bookmarkedWikis)
    // console.log("user in App.js", this.state.user)
    console.log("my wikis", this.state.user.my_wikis)
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route 
            path="/login"
            render={()=> <Login redirectHandler={this.redirectHandlerLogin} loginHandler={this.loginHandler}/>}
          />
          <Route 
            path="/signup"
            render={() => <Signup redirectHandler={this.redirectHandlerSignup} signupHandler={this.signupHandler}/>}
          />
        <Route 
          path="/bookmarks" 
          render={() => {
            return this.state.user ?
              <BookmarkContainer wikis={this.state.user.my_wikis}/>
              : null
        }}/>
          <Route 
            path="/" 
            render={() => {
            return this.state.user ?
              <div>
                <br/>
                <SearchForm searchHandler={this.searchHandler}/>
                <WikiContainer wikis={this.state.searchedWikis} bookmarkHandler={this.bookmarkHandler}/>
              </div>
              : null
          }}/>
        </Switch>
      </div>
    )
  }
}


export default withRouter(App)
