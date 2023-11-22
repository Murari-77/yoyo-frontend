import React, { useState, useEffect, useContext } from 'react';
import ApiCall from '../../services/api.js';
import Button from '../common-components/Button.jsx';
import AddRoomModal from './AddRoomModal.jsx';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { UserContext } from '../../App.js';

const ViewRooms = () => {
  const { user } = useContext(UserContext)
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch all rooms when the component mounts
    async function fetchRooms() {
      try {
        const response = await ApiCall.get(`/api/rooms/getroomsbyhotelid/${user.userDetails._id}`);
        setRooms(response.data); // Set the fetched rooms in state
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }

    fetchRooms();
  }, []); // Empty dependency array to run only once on mount

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await ApiCall.delete(`/api/rooms/deleteById/${roomId}`);
      // After deletion, fetch updated rooms list
      const response = await ApiCall.get(`/api/rooms/getroomsbyhotelid/${user.userDetails._id}`);
      setRooms(response.data); // Update rooms in state
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <div className="text-2xl font-semibold">View Rooms</div>
        <Button text="Add Room" onClick={() => setShowModal(true)} />
      </div>
      {showModal && <AddRoomModal handleClose={handleModalClose} setRooms={setRooms} />}
      {rooms.length > 0 ? <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Per Day</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room._id}>
              <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.rentperday}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RiDeleteBin6Line
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteRoom(room._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div className='flex w-full justify-center'>No Rooms</div>}
    </div>
  );
};

export default ViewRooms;
