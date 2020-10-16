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
        // console.log("MOVE ALONG, TYRNA EDIT", wiki, folderid, foundBookmark.id)
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
        .then(data => console.log(data))
        // set state there in myFolders Array
        // patch request w/ parseInt(folderid)
    }
    
    renderWikis = (folder) => {
        let mybookmarks = this.props.bookmarks.filter(bookmark => bookmark.user_id === this.props.user.id)
        let filteredbookmarks = mybookmarks.filter(bookmark => bookmark.folder_id === folder.id)
        let fruitArray = []
        for (let i=0; i < this.props.wikis.length; i++) {
            for (let j=0; j < filteredbookmarks.length; j++) {
                        if (filteredbookmarks[j]["wiki_id"] === this.props.wikis[i]["id"]) {
                            // console.log("OH MAMA", this.props.user.my_wikis[i])
                            fruitArray.push(this.props.wikis[i])
                        }
                }
        }
        return fruitArray.map(wiki => <WikiCard key={wiki.id} wiki={wiki} editFolderHandler={this.editFolderHandler}bookmarkHandler={this.bookmarkHandler} user={this.props.user} myFolders={this.state.myFoldersArray}/>)
    }

    
    mapFolders = () => {
        return this.state.myFoldersArray.map(folder => 
            <fieldset>
        {this.state.displayEdit ? 
            <legend>
                <form onSubmit={this.submitEditHandler} >
                    <input type="text" placeholder="Enter New Folder Name"/>
                    <input type="submit" />
                </form>
            </legend>
        :
            <legend>
                <p>{folder.name}</p>
                <button className="edit-folder-name" onClick={this.editFormToggle} data-folder={folder.id} >Edit</button>
            </legend>
        }  
            <div className="bookmarkContainer" >
                {this.renderWikis(folder)}
            </div>
        </fieldset>
    )
    }

    editFormToggle = (e) => {
        e.persist();
        this.setState({displayEdit: !this.state.displayEdit})
        console.log("folder in toggle", e.target.dataset.folder)
    }

    submitEditHandler = (e) => {
        e.preventDefault();
        this.editFormToggle(e)
        console.log("submitting", e.target[0].value, e)
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
        // console.log("state in bookmarkcontainer:", this.state, this.props.user.my_folders)
        return(
            <div>
                <br/>
                <NewFolderForm user={this.props.user} newFolderHandler={this.newFolderHandler}/>
                <br/>
                {this.mapFolders()}
            </div>
        )
    }
}