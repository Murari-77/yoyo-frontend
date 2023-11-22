import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import { UserContext } from '../../App';
import ApiCall from '../../services/api';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate(); // To handle redirection

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiCall.post('/api/users/login', formData); // POST to your login endpoint
      console.log(response.data);
       // Log the response
      setUser({
        loggedIn: true,
        userDetails: response.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (response.data.role === 'customer') {
          navigate('/customer/dashboard');
        } else {
          navigate('/hotel/dashboard');
        }
      });
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#93349e]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#93349e] hover:bg-[#93349e] text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
