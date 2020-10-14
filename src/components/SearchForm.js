import React from "react"

export default class SearchForm extends React.Component {

    state = {
        searchTerm: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState({searchTerm: e.target.value})
    }

    searchHandler = (e) => {
        e.preventDefault()
        this.props.searchHandler(this.state.searchTerm)
    }
    
    
    render() {
        return(
            <div>
                <form className="search-form" onSubmit={this.searchHandler}>
                    <input type="search" placeholder="Search..." onChange={this.changeHandler} value={this.state.searchTerm}/>
                </form>
                <button id="feeling-lucky" >Feeling Lucky?</button>
            </div>
        )
    }
}