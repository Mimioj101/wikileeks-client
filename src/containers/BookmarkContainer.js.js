import React from "react"
import WikiCard from '../components/WikiCard.js'
import NewFolderForm from './NewFolderForm.js'

export default class BookmarkContainer extends React.Component{

    state = {
        displayEdit: false,
        textInput: ""
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
        return fruitArray.map(wiki => <WikiCard key={wiki.id} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user}/>)
    }

    bookmarkHandler = (wiki) => {
        let foundBookmark = this.props.bookmarks.find(bookmark => bookmark.user_id === this.props.user.id && bookmark.wiki_id === wiki.id) 
        // console.log("clicked a wiki in bookmarks container:", wiki.id, this.props.bookmarks)
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


    mapFolders = () => {
      return this.props.user.my_folders.map(folder => 
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
                <button className="edit-folder-name" onClick={this.editFormToggle} >Edit</button>
            </legend>
        }  
            <div className="bookmarkContainer">
                {this.renderWikis(folder)}
            </div>
        </fieldset>
    )
    }

    editFormToggle = (e) => {
        e.persist();
        this.setState({displayEdit: !this.state.displayEdit})
    }

    submitEditHandler = (e) => {
        e.preventDefault();
        this.editFormToggle(e)
        
        // fetch("")
        console.log("submitting", e.target[0].value, e)
    }

    
    render() {
        console.log("state in bookmarkcontainer:", this.mapFolders(), this.props.user.my_folders)
        return(
            <div>
                <br/>
                <NewFolderForm />
                <br/>
                {this.mapFolders()}
            </div>
        )
    }
}