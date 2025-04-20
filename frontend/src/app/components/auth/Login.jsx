'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://backendblooddonation.fly.dev/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Erreur de connexion');
      }

      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/donations');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-600">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-red-800">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-black border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-red-800">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-black border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
