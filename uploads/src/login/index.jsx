import React from 'react';
import LoginRegisterForm from '../compontents/LoginRegisterForm';
import {login} from '../utils/api';
import {useNavigate} from 'react-router-dom';

function Login(props) {
    const navigation = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get('username');
        const password = data.get('password');
        if (!username || !password) {
            alert('username or password is empty');
            return;
        }
        // props.login(username, password);
        const temp = await login({username, password});
        // console.log(username, password);
        if (temp) {
            navigation('/', {replace: true});
        }
    }
    return (
        <div className="login-register">
            <h1 className="text-center">Login</h1>
            <LoginRegisterForm type='login' handleSubmit={handleLogin} />
        </div>
    );
}

export default Login;
