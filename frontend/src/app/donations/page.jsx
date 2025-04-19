'use client';
import React, { useEffect, useState } from 'react';
import HeaderAfterAuth from '../components/HeaderAfterAuth';
import Hospital from '../components/Hospital';
import useProtectedRoute from '../hooks/useProtectedRoute';
import BloodLoading from '../components/BloodLoading';

const Page = () => {
  // Calling the custom hook for protected route access
  useProtectedRoute();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetching the user from local storage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      // Parsing the user data from JSON string
      setUser(JSON.parse(storedUser).user);
    }
  }, []); // Empty array means this runs once when the component mounts

  if (!user) {
    // If user data is not available yet, return null or a loading spinner
    return <BloodLoading />;
  }

  return (
    <div>
      <HeaderAfterAuth />
      {/* Pass the 'nom_hospital' value from the user object */}
      <Hospital hospitalName={user.nom_hospital} />
    </div>
  );
};

export default Page;
