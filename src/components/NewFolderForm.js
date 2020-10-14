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
        // let folderObj = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accepts": "application/json"},
        //         body: JSON.stringify({user_id: this.props.user.id, name: e.target[0].value})
        //     }
        //     fetch("http://localhost:3000/api/v1/folders", folderObj)
        //     .then(resp => resp.json())
        //     .then(console.log)
        // force refresh & takes you back to home page
        // window.location.reload();
    }

    render() {
        return(
            <div>
            {this.state.displayForm ? 
            <form onSubmit={this.submitHandler}>
                <input type="text" />
                <input type="submit"/>
            </form>
            :
                <button onClick={this.clickHandler}>+ New Folder</button>
            }
            </div>
        )
    }
}

export default NewFolderForm;