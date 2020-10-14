import React from "react"
import WikiCard from '../components/WikiCard.js'

class FoldersContainer extends React.Component {
    
    // state = {  
    // }

    // map through folder's wikis and for each one render a wikicard

    // renderWikis = (folder) => {
    //     let mybookmarks = this.props.bookmarks.filter(bookmark => bookmark.user_id === this.props.user.id)
    //     let filteredbookmarks = mybookmarks.filter(bookmark => bookmark.folder_id === folder.id)
    //     let fruitArray = []
    //     for (let i=0; i < this.props.wikis.length; i++) {
    //         for (let j=0; j < filteredbookmarks.length; j++) {
    //                     if (filteredbookmarks[j]["wiki_id"] === this.props.wikis[i]["id"]) {
    //                         // console.log("OH MAMA", this.props.user.my_wikis[i])
    //                         fruitArray.push(this.props.wikis[i])
    //                     }
    //             }
    //     }
    //     return fruitArray.map(wiki => <WikiCard key={wiki.id} wiki={wiki} bookmarkHandler={this.bookmarkHandler} user={this.props.user}/>)
    // }
    
    // mapFolders = () => {
    //     return this.props.user.my_folders.map(folder => 
    //         <fieldset>
    //     {this.state.displayEdit ? 
    //         <legend>
    //             <form onSubmit={this.submitEditHandler} >
    //                 <input type="text" placeholder="Enter New Folder Name"/>
    //                 <input type="submit" />
    //             </form>
    //         </legend>
    //     :
    //         <legend>
    //             <p>{folder.name}</p>
    //             <button className="edit-folder-name" onClick={this.editFormToggle} data-folder={folder.id} >Edit</button>
    //         </legend>
    //     }  
    //         <div className="bookmarkContainer">
    //             {this.renderWikis(folder)}
    //         </div>
    //     </fieldset>
    // )
    // }

    // editFormToggle = (e) => {
    //     e.persist();
    //     this.setState({displayEdit: !this.state.displayEdit})
    //     console.log("folder in toggle", e.target.dataset.folder)
    // }

    // submitEditHandler = (e) => {
    //     e.preventDefault();
    //     this.editFormToggle(e)
    //     console.log("submitting", e.target[0].value, e)
    // }
    


    render() {
        return(
            <div>
                {/* {this.mapFolders()} */}
                <p>Hi</p>
            </div>
        )
    }
}

export default FoldersContainer;