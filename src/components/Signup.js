import React from "react"
import { Switch, withRouter, Redirect, Route } from 'react-router-dom'

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

    redirectHandler = () => (
        console.log("take me to login")
        // <Redirect to="/login"/>
    )

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
                    </form>
                </div>
                <br/>
                <div>
                    <button onClick={this.redirectHandler}>Already a member? Login Here</button >
                </div>
            </div>
        )
    }
}