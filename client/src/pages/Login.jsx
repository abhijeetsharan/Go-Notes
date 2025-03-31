import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before new request

        try {
            const response = await axios.post("http://localhost:4000/api/login", { email, password });

            console.log("Login Response:", response.data); // Debugging

            const { access_token } = response.data;

            if (!access_token) {
                setError("Invalid response from server");
                return;
            }

            // Dispatch user info to Redux store
            dispatch(loginSuccess({ token: access_token, user: null }));

            // No need to set localStorage here as it's handled in the reducer
            
            // Set Authorization header globally
            axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
            setError("Invalid email or password");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleLogin} className='p-6 shadow-md rounded-md bg-white w-96'>
                <h2 className='text-xl font-semibold mb-4'>Login</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder='Email'
                    className='w-full p-2 border rounded mb-2'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder='Password'
                    className='w-full p-2 border rounded mb-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-2">
                    Login
                </button>

                <p className='mt-4 text-sm'>
                    Don't have an account? <a href='/register' className='text-blue-500 cursor-pointer'>Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
