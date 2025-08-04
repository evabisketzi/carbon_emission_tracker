import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { AddTripPath, UserProfilePath, ViewTripsPath } from '../../path_constants';

export function Sidebar(): React.ReactElement {
  return (
    <div className="sidebar">
      <Link to={UserProfilePath}>User Profile</Link>
      <Link to={AddTripPath}>Add Trip</Link>
      <Link to={ViewTripsPath}>View Trips</Link>
    </div>
  );
};
