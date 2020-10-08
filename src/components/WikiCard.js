import React from "react"

export default class WikiCard extends React.Component{

    render() {
        let joinedTitle = this.props.wiki.title.split(" ").join("_")
        let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
        return(
            <div class="card">
                <a href={wikiURL}>{this.props.wiki.title}</a>
            </div>
        )
    }
}

// need to change snippet from a string to HTML or JSX (JQuery or maybe some library has it?)
// need to format each card so there is a border, animation, CSS grid