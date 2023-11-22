import React, { useState, useContext } from 'react';
import { UserContext } from '../../App.js';

const CreateBookingModal = ({ handleClose, callback, room }) => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    roomid: room._id,
    userid: user.userDetails._id,
    totalamount: room.rentperday,
    totaldays: 1,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "totaldays") {
      setFormData({ ...formData, [name]: value, totalamount: value * room.rentperday });
    } else {
      setFormData({ ...formData, [name]: value }); 
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    // Implement your validation logic for each field
    // ...

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    callback(formData)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Create Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="totaldays" className="block mb-2">Total Days</label>
            <input
              type="number"
              id="totaldays"
              name="totaldays"
              value={formData.totaldays}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter total days"
            />
            {errors.totaldays && <p className="text-red-500 text-xs mt-1">{errors.totaldays}</p>}
          </div>
          <div>
            <label htmlFor="totalamount" className="block mb-2">Total Amount</label>
            <input
              type="text"
              id="totalamount"
              name="totalamount"
              disabled
              value={formData.totalamount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter total amount"
            />
            {errors.totalamount && <p className="text-red-500 text-xs mt-1">{errors.totalamount}</p>}
          </div>

          <div className='flex justify-between'>
            <button onClick={handleClose} className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded">
              Cancel
            </button>
            <button style={{ cursor: formData.totaldays == 0 ? 'not-allowed' : 'pointer'}} disabled={formData.totaldays === 0} type="submit" className="mt-4 bg-[#93349e] text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
