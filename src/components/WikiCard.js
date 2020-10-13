import React from "react"

export default class WikiCard extends React.Component{

    state = {
        bookmarked: false,
        bookmarksArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/api/v1/bookmarks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then(resp => resp.json())
            .then(
                bookmarks => {
                this.setState({bookmarksArray: bookmarks})
                let bkmrk = this.state.bookmarksArray.find(bookmark => bookmark.wiki_id === this.props.wiki.id && this.props.user.id === bookmark.user_id)
                if (bkmrk) {
                    this.setState({bookmarked: true})
                }
            }
            )
    }
    
    clickHandler = (e) => {
        e.persist();
        // this.setState({bookmarked: !this.state.bookmarked})
        // this.props.bookmarkHandler(this.props.wiki)
        // console.log("wikicard state:", this.state, this.props.wiki.id, this.props.user.id)
    }

    bookmarkRender = () => {
        if (this.state.bookmarked) {
            return <img className="bookmark-img" src="Bookmarked.png" width="25px" onClick={this.clickHandler} />
        } else {
            return <img className="bookmark-img" src="Unbookmarked.png" width="25px" onClick={this.clickHandler} />
        }
    }
    
    render() {
        console.log("state in wiki card:", this.state)
        if (this.props.wiki.page_title) {
            let joinedTitle = this.props.wiki.page_title.split(" ").join("_")
            let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
            return (
                <div className="wiki-card">
                    <span>
                        <a href={wikiURL} target="_blank">{this.props.wiki.page_title}</a>
                        {this.bookmarkRender()}
                    </span>
                 </div>
            )
        } else {
            let joinedTitle = this.props.wiki.title.split(" ").join("_")
            let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
            return (
                <div className="wiki-card" >
                    <span>
                        <a href={wikiURL} target="_blank">{this.props.wiki.title}</a>
                        {this.bookmarkRender()}
                    </span>
                </div>
            )
        }
    }
}

// need to change snippet from a string to HTML or JSX (JQuery or maybe some library has it?)
// need to format each card so there is a hand-drawn border, animation, CSS grid