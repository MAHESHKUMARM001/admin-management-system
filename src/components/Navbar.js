import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1 style={{color:'white',paddingBottom:25}}>Dashboard</h1>
      <ul>
        <li><Link to="/">OverView</Link></li>
        <li><Link to="/search">Search User</Link></li>
        <li><Link to="/users/create">Create User</Link></li>
        <li><Link to="/users">Edit User</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
