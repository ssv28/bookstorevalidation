import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
    const [loginError, setLoginError] = useState("");
    const [logInUser, setLogInUser] = useState(null);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),

        password: Yup.string()
            .required('Required'),
    });

    const handleLogin = (values, { resetForm }) => {
        console.log('login ====>',values);
        
        const storeUser = JSON.parse(localStorage.getItem('user')) || [];

        const findUser = storeUser.find(
            (user) => user.email === values.email && user.password === values.password
        );

        if (findUser) {
            setLogInUser(findUser);
            setLoginError("");
            console.log("Login successful!");
        } else {
            setLoginError("Invalid email or password.");
        }

        resetForm()
    };

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {() => (
                    <Form>
                        <label htmlFor="email">Email:</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        <br />

                        <label htmlFor="password">Password:</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        <br /><br />

                        {loginError && <div style={{ color: 'red' }}>{loginError}</div>}

                        <Button variant="contained" type="submit">Login</Button>
                    </Form>
                )}
            </Formik>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>

            {logInUser && (
                <div>
                    <h2>Welcome, {logInUser.firstName} {logInUser.lastName}!</h2>
                    <p>Email: {logInUser.email}</p>
                </div>
            )}
        </div>
    );
}

export default Login;
