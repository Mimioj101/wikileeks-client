import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class BookmarkContainer extends React.Component{

    renderWikis = () => {
        return this.props.wikis.map(wiki => <WikiCard key={wiki.id} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user}/>)
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
    
    render() {
        return(
            <div>
                <p id="bookmarks-header">Bookmarks</p>
                <div className="bookmarkContainer">
                    {this.renderWikis()}
                </div>
            </div>
        )
    }
}