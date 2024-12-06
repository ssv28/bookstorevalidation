import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {
        const storeUser = JSON.parse(localStorage.getItem("user")) || [];
        setUser(storeUser);
    }, []);

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Invalid password')
            .required('Required'),
    });


    const signupDate = (values, { resetForm }) => {
        console.log(values);

        const newData = [...user, values];
        console.log(newData);

        setUser(newData);
        localStorage.setItem("user", JSON.stringify(newData));
        resetForm();

        navigate('/login');
    };

    


    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}


                onSubmit={signupDate}


            >
                <Form>
                    <label htmlFor="firstName">First Name : </label>
                    <Field name="firstName" />
                    <ErrorMessage name="firstName" component="div" style={{ color: "red" }} /> <br></br>

                    <label htmlFor="lastName">Last Name : </label>
                    <Field name="lastName" />
                    <ErrorMessage name="lastName" component="div" style={{ color: "red" }} /><br></br>

                    <label htmlFor="email">Email Id : </label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="div" style={{ color: "red" }} /><br></br>

                    <label htmlFor="password">Password : </label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div" style={{ color: "red" }} /><br></br><br></br>

                   <Button variant="contained" type='submit'>SIGNUP</Button>

                </Form>

            </Formik>

            <h2>Register User</h2>

            <table border="1" style={{ width: "100%", marginTop: "20px" }}>

                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>


                {
                    user.map((item, index) => (
                        <tr key={index}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                        </tr>
                    ))
                }

            </table>

        </div>
    );
}

export default Signup;
