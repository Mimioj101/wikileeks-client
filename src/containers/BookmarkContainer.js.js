import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class BookmarkContainer extends React.Component{

    renderWikis = () => {
        return this.props.wikis.map(wiki => <WikiCard key={wiki.id} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user}/>)
    }

    bookmarkHandler = (wiki) => {
        console.log("clicked a wiki in bookmarks container:", wiki)
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