import React, { useState } from 'react';
import ApiCall from '../../services/api.js'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    hotelName: '',
    location: '',
    hotelStars: '1',
    fullName: '',
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let hasErrors = false;

    if (!formData.email) {
      errors.email = 'Email is required';
      hasErrors = true;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(errors);
      return;
    }

    try {
      // Make a POST request to the backend API
      const response = await ApiCall.post('/api/users/register', formData);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/login');
      });
      console.log(response.data); // Log the response message
      
      // Redirect the user to the desired page upon successful registration
      // Replace '/home' with your desired redirect URL
      // This might be handled differently based on your frontend setup (e.g., React Router)
      // window.location.href = '/home'; // Redirect example
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#93349e]">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                errors.email && 'border-red-500'
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                errors.password && 'border-red-500'
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword && 'border-red-500'
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2">Role</label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={formData.role}
              onChange={handleRoleChange}
            >
              <option value="hotel">Hotel</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          {formData.role === 'hotel' && (
            <>
              <div className="mb-4">
                <label htmlFor="hotelName" className="block mb-2">Hotel Name</label>
                <input
                  type="text"
                  id="hotelName"
                  name="hotelName"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter hotel name"
                  value={formData.hotelName}
                  onChange={handleInputChange}
                  required={formData.role === 'hotel'}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required={formData.role === 'hotel'}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="hotelStars" className="block mb-2">Hotel Stars</label>
                <select
                  id="hotelStars"
                  name="hotelStars"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  value={formData.hotelStars}
                  onChange={handleInputChange}
                  required={formData.role === 'hotel'}
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </>
          )}
          {formData.role === 'customer' && (
            <>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required={formData.role === 'customer'}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#93349e] hover:bg-[#93349e] text-white py-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
