// frontend/src/components/Auth/Register.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="w-full p-2 border" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full p-2 border" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required minLength={6} className="w-full p-2 border" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Create Account</button>
      </form>
    </div>
  );
}
