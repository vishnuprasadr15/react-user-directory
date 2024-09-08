// src/components/Register.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom'; // Import Link for routing
import axios from 'axios';
import '../App.css';

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log('User registered successfully:', response.data);
      // Handle success (e.g., redirect to login page, show success message)

      // Set success message upon successful registration
      setSuccessMessage('User registered successfully!');

      // Clear form data
      reset();

      // Trigger page refresh after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('There was an error registering the user:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      {successMessage && (
        <div className="alert alert-success animate-alert" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
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
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/login" className="text-decoration-none">Back to Login</Link>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
