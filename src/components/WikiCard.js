import React from "react"

export default class WikiCard extends React.Component{

    render() {
        console.log(typeof this.props.wiki.snippet)
        return(
            <div>
                <h3>{this.props.wiki.title}</h3>
                {this.props.wiki.snippet}
            </div>
        )
    }
}