import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Sidebar } from './pages/navigation/sidebar';
import { AddTripPath, UserProfilePath } from './path_constants';
import { UserProfile } from './pages/user_profile/user_profile';
import { AddTripPage } from './pages/add_trips/add_trip';
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="page-display">
          <Routes>
            <Route path={UserProfilePath} element={<UserProfile/>}/>
            <Route path={AddTripPath} element={<AddTripPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;