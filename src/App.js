import React from 'react';
import './App.css';
import { Switch, withRouter, Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/NavBar'
import BookmarkContainer from './containers/BookmarkContainer.js'
import WikiContainer from './containers/WikiContainer.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import SearchForm from './components/SearchForm.js'
// add to fetch URL if getting CORS error: https://cors-anywhere.herokuapp.com/


class App extends React.Component {

  state = {
    user: "",
    myFoldersArray: [],
    searchedWikis: [],
    wikisArray: [],
    bookmarksArray: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      this.getUser(token)
      this.getBookmarks(token)
      this.getWikis(token)
      this.getFolders(token)
    } else {
      // this line is the reason I cannot go to /signup
      this.props.history.push('/login')
    }
  }

  getUser = (token) => {
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
  }
  
  getBookmarks = (token) => {
    fetch("http://localhost:3000/api/v1/bookmarks", {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(bookmarks => 
      this.setState(
        () => ({bookmarksArray: bookmarks})
    ))
  }

  getWikis = (token) => {
    fetch("http://localhost:3000/api/v1/wikis", {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(wikis => 
      this.setState(
        () => ({wikisArray: wikis})
    ))
  }

  getFolders = (token) => {
    fetch("http://localhost:3000/api/v1/folders", {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(folders => 
      this.getMyFolders(folders)
    )
  }

  getMyFolders = (folders) => {
    let myFolders = folders.filter(folder => folder.user_id === this.state.user.id)
    this.setState({myFoldersArray: myFolders})
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
          () => {
            const token = localStorage.getItem("token")
            this.getBookmarks(token)
            this.getWikis(token)
            this.getFolders(token)
            this.props.history.push('/')
          }
      )
    })
  }

  signupHandler = (userInfo) => {
    const token = localStorage.getItem("token")
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
        () => {
          this.postFolder(userData)
            const token = localStorage.getItem("token")
            this.getBookmarks(token)
            this.getWikis(token)
            this.getFolders(token)
            this.props.history.push('/')
          }
        )
        }
      )
  }


  postFolder = (userData) => {
      const folderObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"},
      body: JSON.stringify({user_id: userData.user.id, name: "Bookmarks"})
    }
    fetch("http://localhost:3000/api/v1/folders", folderObj)
  }

  searchHandler = (searchTerm) => {
    // let banana = searchTerm.split(" ").join("%20")
    fetch(`http://localhost:3000/api/v1/wikiarticles?search=${searchTerm}`)
    .then(resp => resp.json())
    .then(data => 
      this.setState({searchedWikis: data["query"]["search"]})
    )
  }

  postWiki = (wiki, folderid) => {
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
     .then(wikiObj => {
       this.addToStateWiki(wikiObj, folderid)
      })
  }

  postBookmark = (wiki, folderid) => {
    let bookmarksFolder = this.state.myFoldersArray.find(folder => folder.name === "Bookmarks")
    console.log(bookmarksFolder)
    let bookmarkObj = {
      user_id: this.state.user.id,
      wiki_id: wiki["wiki"]["id"],
      folder_id: folderid || bookmarksFolder.id
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
    .then(newBookmark => {
      this.addToStateBookmark(newBookmark)
    })
  }

  deleteBookmark = (foundBookmark) => {
    fetch(`http://localhost:3000/api/v1/bookmarks/${foundBookmark.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  deleteWiki = (foundBookmarkedWiki) => {
    fetch(`http://localhost:3000/api/v1/wikis/${foundBookmarkedWiki.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  addToStateWiki = (wiki, folderid) => {
    let newArray = [...this.state.wikisArray]
    newArray.push(wiki["wiki"])
    this.setState(() => ({wikisArray: newArray}), 
    () => this.postBookmark(wiki, folderid))
  }

  addToStateBookmark = (newBookmark) => {
    let bookmarkArray = [...this.state.bookmarksArray]
    bookmarkArray.push(newBookmark["bookmark"])
    this.setState(() => ({bookmarksArray: bookmarkArray}))
  }

  deleteFromStateBookmark = (foundBookmark) => {
      let bookArray = [...this.state.bookmarksArray]
      let bookIndex = bookArray.findIndex(ele => ele === foundBookmark)
      bookArray.splice(bookIndex, 1)
      this.setState({bookmarksArray: bookArray})
  }

  deleteFromStateWiki = (foundBookmarkedWiki) => {
      let wikiArray = [...this.state.wikisArray]
      let wikiIndex = wikiArray.findIndex(ele => ele === foundBookmarkedWiki)
      wikiArray.splice(wikiIndex, 1)
      this.setState({wikisArray: wikiArray})
  }

  bookmarkHandler = (wiki, folderid) => {
    let foundBookmarkedWiki = this.state.user.my_wikis.find(alreadyBookmarked => alreadyBookmarked.page_id === wiki.pageid)
    if (foundBookmarkedWiki) {
      let foundBookmark = this.state.bookmarksArray.find(bookmark => bookmark.user_id === this.state.user.id && bookmark.wiki_id === foundBookmarkedWiki.id) 
      this.deleteBookmark(foundBookmark)
      this.deleteWiki(foundBookmarkedWiki)
      this.deleteFromStateBookmark(foundBookmark)
      this.deleteFromStateWiki(foundBookmarkedWiki)
    } else {
      this.postWiki(wiki, folderid)
    }
  }

  logout = () => {
    localStorage.clear('token')
    window.location.reload();
  }

  renderNavBar = () => {
    if (this.state.user) {
      return <NavBar logout={this.logout}/>
    } else {
      return null
    }
  }

  findMyWikis = () => {
    let pineapples = this.state.bookmarksArray.filter(bookmark => bookmark.user_id === this.state.user.id)
    let fruitArray = []
    for (let i = 0; i < pineapples.length; i++) {
        for (let j = 0; j < this.state.wikisArray.length; j++) {
          if (pineapples[i].wiki_id == this.state.wikisArray[j].id){
            fruitArray.push(this.state.wikisArray[j])
          }
        }
    }
    return fruitArray
  }

  editFolders = (updatedBookmark, oldBookmark) => {
    let bookArray = [...this.state.bookmarksArray]
    let bookIndex = bookArray.findIndex(ele => ele === oldBookmark)
    bookArray.splice(bookIndex, 1)
    bookArray.push(updatedBookmark)
    this.setState({bookmarksArray: bookArray})
  }


  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route 
            path="/login"
            render={()=> <Login loginHandler={this.loginHandler}/>}
          />
          <Route 
            path="/signup"
            render={() => <Signup signupHandler={this.signupHandler}/>}
          />
          <Route 
            path="/bookmarks" 
            render={() => {
              return this.state.user ?
                <BookmarkContainer wikis={this.findMyWikis()} myFolders={this.state.myFoldersArray} editFolders={this.editFolders} user={this.state.user} bookmarks={this.state.bookmarksArray} wikiStateHandler={this.deleteFromStateWiki} bookmarkStateHandler={this.deleteFromStateBookmark}/>
              : null
          }}/>
          <Route 
            path="/" 
            render={() => {
            return this.state.user ?
              <div>
                <br/>
                <SearchForm searchHandler={this.searchHandler}/>
                <WikiContainer wikis={this.state.searchedWikis} bookmarkHandler={this.bookmarkHandler} user={this.state.user} myFolders={this.state.myFoldersArray}/>
              </div>
            : null
          }}/>
        </Switch>
      </div>
    )
  }
}


export default withRouter(App)