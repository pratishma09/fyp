"use client";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to the login page
                }, 2000);
            } else {
                setErrorMessage(data.error || 'Registration failed. Please try again.');
            }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>
                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm whitespace-pre-line text-center mt-4">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
