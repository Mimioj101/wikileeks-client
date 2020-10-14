import React from "react"

class NewFolderForm extends React.Component {
    
    state = {
        textValue: ""
    }
    
    clickHandler = (e) => {
        e.persist();
        console.log(e)
    }

    render() {
        return(
            <div>
                <button onClick={this.clickHandler} >Add new Folder</button>
            </div>
        )
    }
}

export default NewFolderForm;