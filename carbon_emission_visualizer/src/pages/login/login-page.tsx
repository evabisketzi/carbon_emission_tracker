import { useState, type JSX } from 'react';
import { userProvider, type LoginDetails } from '../../services/user_services';
import { LoginForm } from '../../components/login_form';
import './login-page.css';
import { useNavigate } from 'react-router-dom';
import { AddTripPath } from '../../path_constants';
import { useAuth } from '../../services/auth_services';
import type { LoginResponse } from '../../types/auth_types';
import type { AxiosResponse } from 'axios';

export function LoginPage(): JSX.Element {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const onSubmit = (data: LoginDetails) => {
        userProvider.loginUser(data).subscribe({
            next: (value: AxiosResponse<LoginResponse>) => {
                setToken(value.data.accessToken);
                navigate(`/app/${AddTripPath}`, {replace: true});
            },
            error: err => setStatusMessage(`Error: ${err.message}`),
        });
    };

    return (
        <div className="login-page">
        <h1>User Login</h1>
            <LoginForm onSubmit={onSubmit} />
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
};