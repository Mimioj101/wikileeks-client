import React from "react"

export default class Signup extends React.Component{
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({[e.target.name]: e.target.value}))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.signupHandler(this.state)
    }

    render() {
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                <input type="submit" value="Signup"/>
                </form>
            </div>
        )
    }
}