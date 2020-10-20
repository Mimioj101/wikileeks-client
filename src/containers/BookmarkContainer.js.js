import React from "react"
import WikiCard from '../components/WikiCard.js'
import NewFolderForm from '../components/NewFolderForm.js'

export default class BookmarkContainer extends React.Component{

    state = {
        myFoldersArray: [],
        displayEdit: false
    }


    componentDidMount = () => {
        const token = localStorage.getItem("token")
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
        let myFolders = folders.filter(folder => folder.user_id === this.props.user.id)
        this.setState({myFoldersArray: myFolders})
      }
    
    
    bookmarkHandler = (wiki) => {
        let foundBookmark = this.props.bookmarks.find(bookmark => bookmark.user_id === this.props.user.id && bookmark.wiki_id === wiki.id) 
        this.deleteBookmarkedWiki(wiki)
        this.deleteBookmarkedBookmark(foundBookmark)
        this.props.bookmarkStateHandler(foundBookmark)
        this.props.wikiStateHandler(wiki)
    }
    
    deleteBookmarkedBookmark = (foundBookmark) => {
        fetch(`http://localhost:3000/api/v1/bookmarks/${foundBookmark.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    
    deleteBookmarkedWiki = (wiki) => {
        fetch(`http://localhost:3000/api/v1/wikis/${wiki.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    editFolderHandler = (wiki, folderid) => {
        let foundBookmark = this.props.bookmarks.find(bookmark => bookmark.user_id === this.props.user.id && bookmark.wiki_id === wiki.id) 
        let foldid = parseInt(folderid)
        let bookmarkObj = {
            user_id: this.props.user.id,
            wiki_id: wiki["id"],
            folder_id: foldid
        }
        fetch(`http://localhost:3000/api/v1/bookmarks/${foundBookmark.id}`, {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(bookmarkObj)

        })
        .then(resp => resp.json())
        .then(updatedBookmark => this.props.editFolders(updatedBookmark, foundBookmark))
    }
    
    renderWikis = (folder) => {
        let mybookmarks = this.props.bookmarks.filter(bookmark => bookmark.user_id === this.props.user.id && bookmark.folder_id === folder.id)
        let fruitArray = []
        for (let i=0; i < this.props.wikis.length; i++) {
            for (let j=0; j < mybookmarks.length; j++) {
                        if (mybookmarks[j]["wiki_id"] === this.props.wikis[i]["id"]) {
                            fruitArray.push(this.props.wikis[i])
                        }
                }
        }
        return fruitArray.map(wiki => <WikiCard key={wiki.id} wiki={wiki} editFolderHandler={this.editFolderHandler} bookmarkHandler={this.bookmarkHandler} user={this.props.user} myFolders={this.state.myFoldersArray}/>)
    }

    clickHandler = (e) => {
        e.persist();
        this.deleteFolder(e.target.dataset.id)
        console.log(e.target.dataset.id)
    }

    deleteFolder = (folderid) => {
        let numFolderID = parseInt(folderid)
        let folderArray = [...this.state.myFoldersArray]
        let folderIndex = folderArray.findIndex(folder => folder.id === numFolderID)
        folderArray.splice(folderIndex, 1)
        this.setState({myFoldersArray: folderArray})
        fetch(`http://localhost:3000/api/v1/folders/${numFolderID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        // should also delete wikis under that folder
    }

    
    mapFolders = () => {
        return this.state.myFoldersArray.map(folder => 
            <fieldset className="folder-fieldset" >
                <legend>
                    <p>{folder.name} <button data-id={folder.id} onClick={this.clickHandler} className="delete-folder">X</button></p>
                    
                </legend>
                <div className="bookmarkContainer" >
                    {this.renderWikis(folder)}
                </div>
            </fieldset>
    )
    }

    newFolderHandler = (e) => {
        let folderObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"},
                body: JSON.stringify({user_id: this.props.user.id, name: e.target[0].value})
            }
        fetch("http://localhost:3000/api/v1/folders", folderObj)
        .then(resp => resp.json())
        .then(folder => {
            let newArray = [...this.state.myFoldersArray, folder["folder"]]
            this.setState({myFoldersArray: newArray})
        })
    }
    
    render() {
        return(
            <div>
                <br/>
                <NewFolderForm user={this.props.user} newFolderHandler={this.newFolderHandler}/>
                {this.mapFolders()}
            </div>
        )
    }
}