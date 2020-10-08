import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class WikiContainer extends React.Component{

    parseWikis = () => {
        return this.props.wikis.map(wiki => <WikiCard key={wiki.id} wiki={wiki}/>)
    }
    

    render() {
        console.log(this.props.wikis)
        return(
            <div>
                <br/>
                {this.parseWikis()}
            </div>
        )
    }
}