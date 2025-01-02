import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';
import AuthLayout from './AuthLayout';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <AuthLayout 
      title="Welcome to Collaborative Whiteboard"
      subtitle="Create and share ideas together in real-time"
    >
      <div className="space-y-4">
        <button
          onClick={() => navigate('/signup')}
          className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Create an Account
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-indigo-50 to-white text-gray-500">
              Already have an account?
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/signin')}
          className="group relative w-full flex items-center justify-center py-3 px-4 border-2 border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Sign In
        </button>
      </div>
    </AuthLayout>
  );
}