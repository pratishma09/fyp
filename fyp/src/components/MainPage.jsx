import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage({ token, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) onLogout(); // Call the onLogout handler to remove the token from the parent state or context
        navigate('/login');
    };

    // Render "Hello World" if no token
    if (!token) {
        return (
            <div className={`relative min-h-screen flex`}>
                <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center">
                    <p className="text-4xl">Hello World</p>
                </div>
            </div>
        );
    }

    // Render main page if token exists
    return (
        <div className={`relative min-h-screen flex`}>
            <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center">
                <p className="text-4xl">Main Page</p>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white mt-12 py-2 px-12 rounded-md hover:bg-blue-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default MainPage;
