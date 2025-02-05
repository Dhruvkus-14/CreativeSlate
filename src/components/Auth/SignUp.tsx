import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from './AuthLayout';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (!error) {
      navigate('/whiteboard');
    }
  };

  return (
    <AuthLayout 
      title="Create your account"
      subtitle="Start collaborating on whiteboards today"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              required
              minLength={6}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}