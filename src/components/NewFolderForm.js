import React from "react"

class NewFolderForm extends React.Component {
    
    state = {
        textValue: "",
        displayForm: false
    }
    
    clickHandler = (e) => {
        e.persist();
        this.setState({displayForm: !this.state.displayForm})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({displayForm: !this.state.displayForm})
        this.props.newFolderHandler(e)
    }

    render() {
        return(
            <div>
            {this.state.displayForm ? 
            <form id="new-folder-form" onSubmit={this.submitHandler}>
                <input id="new-folder-input" type="text" />
                <input id="new-folder-submit" type="submit"/>
            </form>
            :
                <button id="new-folder-button" onClick={this.clickHandler}>+ New Folder</button>
            }
            </div>
        )
    }
}

export default NewFolderForm;