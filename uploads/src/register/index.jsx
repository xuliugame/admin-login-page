import React from 'react';
import LoginRegisterForm from '../compontents/LoginRegisterForm';
import {register} from '../utils/api';
import {useNavigate} from 'react-router-dom';

function Register(props) {
    const navigation = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get('username');
        const password = data.get('password');
        const repeatPassword = data.get('repeatPassword');
        const isAdmin = data.get('isAdmin');

        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }
        const temp = await register({username, password, repeatPassword, isAdmin: isAdmin === 'on'});
        if (temp) {
            navigation('/login', {replace: true});
        }
    }

    return (
        <div className="login-register">
            <h1 className="text-center">Register</h1>
            <LoginRegisterForm type="register" handleSubmit={handleRegister}/>
        </div>
    );
}

export default Register;
