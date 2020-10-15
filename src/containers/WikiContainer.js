import React from "react"
import WikiCard from '../components/WikiCard.js'

export default class WikiContainer extends React.Component{

    state = {
        myFoldersArray: []
    }
    
    parseWikis = () => {
        return this.props.wikis.map(wiki => <WikiCard key={wiki.pageid} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user} myFolders={this.state.myFoldersArray}/>)
    }


    bookmarkHandler = (wiki) => {
        this.props.bookmarkHandler(wiki)
        // console.log("wikicontainer:", wiki)
    }

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3000/api/v1/folders", {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
        .then(resp => resp.json())
        .then(folders => 
          this.getMyFolders(folders)
        )
      }
    
      getMyFolders = (folders) => {
        let myFolders = folders.filter(folder => folder.user_id === this.props.user.id)
        this.setState({myFoldersArray: myFolders})
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