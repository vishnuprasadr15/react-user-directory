// src/components/Login.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom'; // Import Link for routing

type LoginFormInputs = {
    email: string;
    password: string;
};

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow-sm rounded">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                {/* Align "Back to Register" Link and Register Button in the Same Line */}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/register" className="text-decoration-none">Back to Register</Link>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
