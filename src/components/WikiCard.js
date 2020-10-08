import React from "react"

export default class WikiCard extends React.Component{

    render() {
        console.log(this.props.wiki)
        return(
            <div class="card">
                <h3>{this.props.wiki.title}</h3>
                <a href={this.props.wiki.url} target="_blank">{this.props.wiki.title}</a>
            </div>
        )
    }
}

// need to change snippet from a string to HTML or JSX (JQuery or maybe some library has it?)
// need to format each card so there is a border, animation, CSS grid