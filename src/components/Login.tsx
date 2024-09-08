// src/components/Login.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
    username: string;
    password: string;
};

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema)
    });

    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/login`,
                {
                    username: data.username,
                    password: data.password
                }
            );

            const { token } = response.data;

            // Validate the token (simple validation, normally done by backend)
            if (token) {
                // Save the token in a cookie
                Cookies.set('jwt', token, { expires: 1 }); // Expires in 1 day

                // Redirect to welcome page
                navigate('/welcome');
            } else {
                setLoginError('Invalid login credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Failed to log in. Please check your username and password.');
        }
    };


    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <h2 className="text-center mb-4">Login</h2>
                {loginError && (
                    <div className="alert alert-danger" role="alert">
                        {loginError}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow-sm rounded">
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/register" className="text-decoration-none">Back to Register</Link>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
