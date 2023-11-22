import React, { useContext, useState } from 'react';
import { UserContext } from '../../App.js';
import ApiCall from '../../services/api.js';
import Swal from 'sweetalert2';

const AddRoomModal = ({ handleClose, setRooms }) => {
  const { user } = useContext(UserContext)

  const [formData, setFormData] = useState({
    name: '',
    rentperday: '',
    type: '',
    description: '',
    hotel: user.userDetails._id,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    try {
      // Make a POST request to add a new room
      await ApiCall.post('/api/rooms/addRoom', formData);
      // On successful submission, close the modal and refresh room data
      Swal.fire({
        icon: 'success',
        title: 'Room Added!',
        text: 'Your room has been successfully added.',
      }).then(async () => {
        handleClose();
        setFormData({
          name: '',
          rentperday: '',
          type: '',
          description: '',
          hotel: user.userDetails._id,
        });
        setErrors({});
        // Fetch updated room data after adding the room
        const response = await ApiCall.get(`/api/rooms/getroomsbyhotelid/${user.userDetails._id}`);
        setRooms(response.data);
      });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Room Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter room name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Other form fields with similar styling */}
          <div>
            <label htmlFor="rentperday" className="block mb-2">Rent Per Day</label>
            <input
              type="text"
              id="rentperday"
              name="rentperday"
              value={formData.rentperday}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter rent per day"
            />
            {errors.rentperday && <p className="text-red-500 text-xs mt-1">{errors.rentperday}</p>}
          </div>

          <div>
            <label htmlFor="type" className="block mb-2">Room Type</label>
            <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            >
                <option value="">Select room type</option>
                <option value="Suite">Suite</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Standard">Standard</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>

          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className='flex justify-between'>
            <button onClick={handleClose} className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded">
                Cancel
            </button>
            <button type="submit" className="mt-4 bg-[#93349e] text-white py-2 px-4 rounded">
                Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;
