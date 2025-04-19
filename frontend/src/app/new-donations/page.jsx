'use client';
import React from 'react'
import HeaderAfterAuth from '../components/HeaderAfterAuth'
import NewDonationPage from '../components/NewDonation'
import useProtectedRoute from '../hooks/useProtectedRoute';

const page = () => {
  useProtectedRoute();
  return (
    <div>
        <HeaderAfterAuth/>
        <NewDonationPage hospitalName={"CHU Ibn Rochd"}/>
    </div>
  )
}

export default page