import React from "react"
// import { Switch, withRouter, Redirect, Route } from 'react-router-dom'

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
                <div>
                    <form className="signup-form" onSubmit={this.submitHandler}>
                    <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                    <br/>
                    <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                    <br/>
                    <input type="submit" value="Signup"/>
                    <a href="http://localhost:3001/login">Already a member? Login here!</a>
                    </form>
                </div>
            </div>
        )
    }
}