'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => setAnimation(true), 100);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous error messages
    setIsLoading(true); // Show loading state

    try {
      // Send login request to the backend
      const res = await fetch('https://backprojectlifelinkai.fly.dev/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });

      if (!res.ok) {
        // If the response is not OK, parse the error message
        const data = await res.json();
        throw new Error(data.detail || 'Connection error');
      }

      const user = await res.json(); // Parse the user data from the response
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage

      // Trigger success animation before redirecting
      setAnimation(false);
      setTimeout(() => {
        router.push('/donations'); // Redirect to the donations page
      }, 800);
    } catch (err) {
      setError(err.message); // Display error message
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-red-900 via-red-700 to-red-500 fixed inset-0">
      <div className="absolute inset-0 opacity-20">
        {/* Render 20 static background elements with deterministic positions */}
        {[...Array(20)].map((_, i) => {
          const size = 5 + ((i % 5) * 4); // Vary size based on index
          const leftPos = ((i * 17) % 100); // Calculate left position
          const topPos = ((i * 13) % 100); // Calculate top position
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-red-200"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${leftPos}%`,
                top: `${topPos}%`,
                opacity: 0.4
              }}
            />
          );
        })}
      </div>
      
      <div 
        className={`relative w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-red-600 rounded-2xl opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            {/* Icon inside a circular background */}
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-black drop-shadow-md">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-black text-opacity-90">Email</label>
              <div className="relative">
                {/* Email input field with an icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-red-200 placeholder-opacity-70 transition-all duration-300"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-black text-opacity-90">Password</label>
              <div className="relative">
                {/* Password input field with an icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-red-200 placeholder-opacity-70 transition-all duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                  required
                />
              </div>
            </div>
            
            {error && (
              // Display error message if present
              <div className="px-4 py-3 rounded-lg bg-red-900 bg-opacity-30 border border-red-800">
                <p className="text-sm text-white flex items-center">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1z" clipRule="evenodd"></path>
                  </svg>
                  {error}
                </p>
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading} // Disable button while loading
                className="relative w-full py-3 px-4 text-white font-medium bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-lg hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  {isLoading ? (
                    // Show spinner while loading
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Login
                </div>
              </button>
            </div>
            
          </form>
        </div>
      </div>
      
    </main>
  );
}