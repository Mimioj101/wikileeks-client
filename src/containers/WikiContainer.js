import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class WikiContainer extends React.Component{

    render() {
        return(
            <div>
                <br></br>
                <p>WikiContainer</p>
                <WikiCard />
            </div>
        )
    }
}