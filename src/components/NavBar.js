import React from "react"
import { NavLink } from 'react-router-dom';


const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }

  class NavBar extends React.Component {
    render() {
      return (
        <div className="navbar">
          <NavLink
            to="/"
            exact
            style={link}
            activeStyle={{background: '#6A994E'}}>
          Home</NavLink>
          <NavLink
            to="/bookmarks"
            exact
            style={link}
            activeStyle={{background: '#6A994E'}}>
          Bookmarks</NavLink>
          {/* <NavLink
          to="/logout"
          exact
          style={link}
          activeStyle={{background: '#6A994E'}}>
          Logout</NavLink> 
          <NavLink
            to="/login"
            exact
            style={link}
            activeStyle={{background: '#6A994E'}}>
          Login</NavLink> */}
        </div>
      );
    }
  };
  
  export default NavBar;