"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [message, setMessage] = useState('');

  const validate = () => {
    let valid = true;
    let errors: { username?: string; password?: string } = {};

    if (!username) {
      errors.username = 'Username is required';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('https://tradibi.netlify.app/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  username, password }),
        });

        const data = await response.json();
        

        if (response.ok) {
          setMessage('Login successful!');
          localStorage.setItem('userId', data.user.id)
          router.push('/announcements');
        } else {
          const data = await response.json();
          setMessage(`Login failed`);
        }
      } catch (error) {
        setMessage('Login failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {message && <p className={`text-center ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
            <p>Pas de compte ? <a href="/register" className="text-blue-600">S'enregistrer</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
