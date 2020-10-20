import React from "react"

export default class WikiCard extends React.Component{

    state = {
        bookmarked: false,
        bookmarksArray: [],
        selectedFolder: ""
    }

    componentDidMount = () => {
        // grabs all the bookmarks from DB and saves in state. if it finds a bookmark in state (aka in the DB) then it marks it as "bookmarked"
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
                    this.setState({bookmarked: !this.state.bookmarked})
                }
            }
            )
    }
    
    clickHandler = (e) => {
        e.persist();
        this.setState({bookmarked: !this.state.bookmarked})
        this.props.bookmarkHandler(this.props.wiki, this.state.selectedFolder)
    }

    mapFolders = () => {
        return this.props.myFolders.map(folder => <option value={folder.id} >{folder.name}</option>)
    }

    dropDownHandler = (e) => {
        e.persist();
        this.setState({selectedFolder: e.target.value})
    }

    bookmarkRender = () => {
        if (this.state.bookmarked) {
            {/* red bookmark img */}
            return <img className="bookmark-img" src="greenbookmark.png" width="45px" onClick={this.clickHandler} />
        } else {
            {/* black bookmark img */}
            return <img className="bookmark-img" src="greybookmark.png" width="45px" onClick={this.clickHandler} />
        }
    }

    editDropDownHandler = (e) => {
        e.persist();
        this.props.editFolderHandler(this.props.wiki, e.target.value)
    }


    
    render() {
        if (this.props.wiki.page_title) {
            // page_title = its bookmarked & saved to DB
            let joinedTitle = this.props.wiki.page_title.split(" ").join("_")
            let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
            return (
                <div className="wiki-card">
                    <span>
                        <a href={wikiURL} target="_blank">{this.props.wiki.page_title}</a>
                        <form onChange={this.editDropDownHandler}>
                            <select id="change-folder" className="dropdown" >
                                <option disabled hidden selected>Change Folder</option>
                                {this.mapFolders()}
                            </select>
                        </form>
                        {this.bookmarkRender()}
                    </span>
                 </div>
            )
        } else {
            // pagetitle = its a wiki fresh from wikipedia and has not been saved to DB
            let joinedTitle = this.props.wiki.title.split(" ").join("_")
            let wikiURL = `https://en.wikipedia.org/wiki/${joinedTitle}` 
            return (
                <div className="wiki-card" >
                    <span>
                        <a href={wikiURL} target="_blank">{this.props.wiki.title}</a>
                        <form onChange={this.dropDownHandler}>
                            <select id="available-folders" className="dropdown">
                                <option disabled hidden selected>Select A Folder</option>
                                {this.mapFolders()}
                            </select>
                        </form>
                        {this.bookmarkRender()}
                    </span>
                </div>
            )
        }
    }
}

// need to change snippet from a string to HTML or JSX (JQuery or maybe some library has it?)