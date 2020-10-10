import React from "react"
import { Switch, withRouter, Redirect, Route } from 'react-router-dom'

export default class Login extends React.Component{

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
        this.props.loginHandler(this.state)
    }

    redirectHandler = () => {
        console.log("take me to signup")
        // <Redirect to="/signup"/>
    }
    render() {
        return(
            <div>
                <div>
                    <form className="login-form" onSubmit={this.submitHandler}>
                        <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                        <br/>
                        <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                        <br/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
                <br/>
                <div>
                    <button onClick={this.redirectHandler}>Not yet a member? Sign up here</button>
                </div>
            </div>
        )
    }
}