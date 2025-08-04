import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './pages/navigation/sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <></>
        </div>
      </div>
    </Router>
  );
};

export default App;