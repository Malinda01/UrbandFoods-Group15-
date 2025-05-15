import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5 text-center">
            <div className="p-5 bg-success text-white rounded shadow-lg">
                <h1 className="mb-4 display-4">Welcome to Urban Food</h1>
                <p className="lead">Your one-stop solution for managing supplier products and profiles.</p>
            </div>
            <div className="mt-5">
                <button 
                    className="btn btn-primary btn-lg me-3 px-5 py-3 shadow-sm" 
                    onClick={() => navigate('/supplier-login')}
                >
                    Login
                </button>
                <button 
                    className="btn btn-secondary btn-lg px-5 py-3 shadow-sm" 
                    onClick={() => navigate('/supplier-register')}
                >
                    Register
                </button>
            </div>
            <div className="mt-5">
                <p className="text-muted">Need help? <a href="/support" className="text-success fw-bold">Contact Support</a></p>
            </div>
        </div>
    );
};

export default Home;
