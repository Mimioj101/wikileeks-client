import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class WikiContainer extends React.Component{

    
    parseWikis = () => {
        return this.props.wikis.map(wiki => <WikiCard key={wiki.pageid} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user} myFolders={this.props.myFolders}/>)
    }


    bookmarkHandler = (wiki, folderid) => {
        this.props.bookmarkHandler(wiki, folderid)
    }

    render() {
        return(
            <div className="wikiContainer">
                <br/>
                {this.parseWikis()}
            </div>
        )
    }
}