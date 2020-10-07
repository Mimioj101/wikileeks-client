import React from "react"
import WikiCard from '../components/WikiCard.js'
import SearchForm from '../components/SearchForm.js'

export default class WikiContainer extends React.Component{

    render() {
        return(
            <div>
                <br></br>
                <SearchForm />
                <p>WikiContainer</p>
                <WikiCard />
            </div>
        )
    }
}