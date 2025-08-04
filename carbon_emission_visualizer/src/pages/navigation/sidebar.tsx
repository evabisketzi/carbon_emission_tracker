import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export function Sidebar(): React.ReactElement {
  return (
    <div className="sidebar">
      <Link to="/user-profile">User Profile</Link>
      <Link to="/add-trip">Add Trip</Link>
      <Link to="/view-trips">View Trips</Link>
    </div>
  );
};
