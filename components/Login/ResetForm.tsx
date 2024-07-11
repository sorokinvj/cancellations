'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';

const ResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // To display status messages to the user

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your email for password reset instructions.');
      // Optionally redirect the user or provide further instructions
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
      setMessage('');
    }
  };
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="space-y-4 px-16 py-8 xl:px-32 xl:py-16">
        <div className="flex flex-col text-left">
          <div className="mb-1 text-4xl font-bold">Reset password</div>
          <div className="text-large text-gray-500">Enter your email</div>
        </div>
        <div className="flex items-center space-x-2">
          <hr className="h-px flex-1 border-0 bg-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              placeholder="name@company.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            disabled={loading}
            type="submit"
            loading={loading}
          >
            Send Reset Email
          </Button>
          {message && (
            <p className="text-sm text-center font-light text-gray-500">
              {message}
            </p>
          )}
          <p className="text-sm font-light text-gray-500">
            Remembered your password?{' '}
            <span className="text-flair-600 font-medium hover:underline">
              <Link href="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
