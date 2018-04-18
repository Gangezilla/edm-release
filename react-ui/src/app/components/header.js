import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {


  // const renderUser = () => {
  //   // if (props.user !== null) {
  //   //   return (
  //   //     <span>Hello, {props.user.user_first_name}</span>
  //   //   )
  //   // }
  //   return null;
  // }
  return (
    <div className="header__container">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to='/email/create/'>EDM Slice</Link></li>
      </ul>
      <ul>
        <li><Link to="/user/log-in">Log in</Link></li>
        <li onClick={() => props.logout()}>Logout</li>
        <li><Link to="/user/log-in">Sign Up</Link></li>
        <li><Link to="/user/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
}

export default Header;
