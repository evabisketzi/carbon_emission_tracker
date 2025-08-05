import { useState, type JSX } from 'react';
import { userProvider, type LoginDetails } from '../../services/user_services';
import { LoginForm } from '../../components/login_form';
import './login-page.css';
import { useNavigate } from 'react-router-dom';
import { AddTripPath } from '../../path_constants';
import { useAuth } from '../../services/auth_services';

export function LoginPage(): JSX.Element {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState<string | null>(null); 

    const onSubmit = async (data: LoginDetails) => {
        try {
            const userToken = await userProvider.loginUser(data);
            setToken(userToken.data.accessToken);
            navigate(AddTripPath, { replace: true });
        } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
        }
        
    };

    return (
        <div className="login-page">
        <h1>User Login</h1>
            <LoginForm onSubmit={onSubmit} />
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};