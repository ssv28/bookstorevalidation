import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [loginError, setLoginError] = useState("");
    const [logInUser, setLogInUser] = useState(null);
    const navigate = useNavigate();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    const userLogin = (values, { resetForm }) => {
        console.log('login ====>', values);

        const storeUser = JSON.parse(localStorage.getItem('user')) || [];
        console.log(storeUser);

        const findUser = storeUser.find(
            (user) => user.email === values.email && user.password === values.password
        );

        if (findUser) {
            setLogInUser(findUser);
            setLoginError("");
            console.log("Login successful!");
            resetForm();

            localStorage.setItem('loggedInUser', JSON.stringify(findUser));
            navigate('/bookstore');
        } else {
            setLoginError("Invalid email or password.");
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}>
                <div style={{ border: "5px solid #000", borderRadius: "20px", width: "22%", padding: "30px" }}>
                    <h1>Login</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={userLogin}
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

                   
                </div>
            </div>
        </div>
    );
}

export default Login;
