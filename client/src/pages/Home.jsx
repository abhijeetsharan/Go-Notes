import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Added import for Redux state

const Home = () => {
  // Access authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <div className='flex flex-col items-center mt-20 px-8 py-12 text-center text-gray-800 bg-white bg-opacity-90 rounded-lg shadow-xl border border-gray-200 max-w-2xl'>
        <h1 className='flex items-center gap-2 text-2xl sm:text-4xl font-bold mb-4 text-blue-600'>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Go Notes
        </h1>
        <h2 className='text-xl sm:text-3xl font-semibold mb-6 text-gray-700'>Your Personal Note-Taking Solution</h2>
        <p className='mb-8 max-w-md text-gray-600 leading-relaxed text-lg'>
          Capture your ideas, organize your thoughts, and access your notes from anywhere. 
          Simple, fast, and secure note-taking for your everyday needs.
        </p>
        
        {/* Conditional rendering based on authentication status */}
        {isAuthenticated ? (
          <Link 
            to="/dashboard" 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;