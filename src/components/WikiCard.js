import React from "react"

export default class WikiCard extends React.Component{

    state = {
        bookmarked: false
    }
    
    clickHandler = (e) => {
        e.persist();
        this.setState({bookmarked: !this.state.bookmarked})
        this.props.bookmarkHandler(this.props.wiki)
    }

    bookmarkRender = () => {
        if (this.state.bookmarked) {
            return <img src="Bookmarked.png" width="20px" onClick={this.clickHandler} />
        } else {
            return <img src="Unbookmarked.png" width="20px" onClick={this.clickHandler} />
        }
    }
    
    render() {
        // console.log("state in wikicard", this.state.bookmarked)
        let joinedTitle = this.props.wiki.title.split(" ").join("_")
        let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
        return(
            <div id="wiki-card" className="card">
                <span>
                    <a href={wikiURL} target="_blank">{this.props.wiki.title}</a>
                    {this.bookmarkRender()}
                </span>
            </div>
        )
    }
}

// need to change snippet from a string to HTML or JSX (JQuery or maybe some library has it?)
// need to format each card so there is a hand-drawn border, animation, CSS grid