import {Form, Button} from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

function LoginRegisterForm(props) {
    const {handleSubmit, type} = props;
    console.log(handleSubmit, type);
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" name="username"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password"/>
            </Form.Group>
            {
                type === 'register' &&
                <Form.Group className="mb-3" controlId="repeatPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" name="repeatPassword"/>
                </Form.Group>
            }
            {
                type === 'register' &&
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="isAdmin" label="admin?" />
                </Form.Group>
            }
            <div className="text-center">
                <Button variant="primary" type="submit" className="btn-lg">
                    Submit
                </Button>
                <Link to={type === 'register' ? '/login' : '/register'} className="float-end">{type === 'register' ? 'login' : 'register'}</Link>
            </div>


        </Form>
    );
}

export default LoginRegisterForm;
