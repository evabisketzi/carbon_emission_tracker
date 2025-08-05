import React from 'react';
import './App.css';
import { AuthProvider } from './services/auth_services';
import Routes from './pages/routes/routes';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
export default App;