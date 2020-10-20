import React from "react"
import { NavLink } from 'react-router-dom';


const link = {
    width: '100px',
    padding: '21px',
    margin: '0 6px 6px',
    background: '#252627',
    textDecoration: 'none',
    color: 'white',
  }

  

  class NavBar extends React.Component {
    render() {
      
      return (
        <div className="navbar">
          <img id="wikiorb" src="wikiorb.png"/>
          <NavLink
            to="/"
            exact
            style={link}
            activeStyle={{background: '#d68c45'}}>
          Home</NavLink>
          <NavLink
            to="/bookmarks"
            exact
            style={link}
            activeStyle={{background: '#d68c45'}}>
          Bookmarks</NavLink>

          <NavLink
          to="/"
          exact
          style={link}
          // activeStyle={{background: '#ffc9b9'}}
          onClick={this.props.logout}>
          Logout</NavLink>
        </div>
      );
    }
  };
  
  export default NavBar;