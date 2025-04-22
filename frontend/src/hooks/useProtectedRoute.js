'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, []);
}
