import React, { useState } from 'react';
import axios from 'axios';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before new request

        try {
            const response = await axios.post("http://localhost:4000/api/login", { email, password });

            const { token, user } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);

            // Set Authorization header globally
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Dispatch user info to Redux store
            dispatch(loginSuccess({ token, user }));

            navigate("/");
        } catch (error) {
            setError("Invalid email or password", error);
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

                <button className="w-full bg-blue-500 text-white py-2 rounded mt-2">
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
