import React, { useState, useEffect } from 'react';
import ApiCall from '../../services/api.js';
import Button from '../common-components/Button.jsx';
import CreateBookingModal from './CreateBookingModal.jsx';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ViewHotels = ({ toggle }) => {
  const [hotels, setHotels] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateBookingModal, setShowCreateBookingModal] = useState(false);

  const handleViewRooms = async (hotelId) => {
    try {
      const response = await ApiCall.get(`/api/rooms/getroomsbyhotelid/${hotelId}`);
      setHotelRooms(response.data);
      setSelectedHotel(selectedHotel === hotelId ? null : hotelId);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await ApiCall.get('/api/users/getAllHotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const onBook = async (data) => {
    try {
      const response = await ApiCall.post('/api/bookings/bookroom', data);
      console.log('Booking successful:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Booking Created!',
        text: 'Your booking has been successfully created.',
      }).then(() => {
        closeCreateBookingModal();
      toggle()
      });
      
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error states
    }
  };

  const openCreateBookingModal = () => {
    setShowCreateBookingModal(true);
  };

  const closeCreateBookingModal = () => {
    setShowCreateBookingModal(false);
  };

  return (
    <div className="grid gap-4 md:grid-cols-1">
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="bg-white rounded-lg shadow-lg p-4 cursor-pointer w-full"
          onClick={() => handleViewRooms(hotel._id)}
        >
          <h3 className="text-xl font-semibold mb-2">Hotel Name : {hotel.hotelName}</h3>
          <p className="text-gray-600">Location : {hotel.location}</p>
          <div className="flex items-center mb-2">
            Stars : {[...Array(hotel.hotelStars)].map((star, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
          </div>
          {selectedHotel === hotel._id && (
            <div className="mt-4 bg-gray-100 p-4">
              {hotelRooms.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Per Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hotelRooms.map((room) => (
                      <tr key={room._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.rentperday}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{room.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            onClick={() => {
                              setSelectedRoom(room);
                              openCreateBookingModal();
                            }}
                            text="Book Now"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex w-full justify-center">No Rooms</div>
              )}
            </div>
          )}
        </div>
      ))}
      {showCreateBookingModal && selectedRoom && (
        <CreateBookingModal
          handleClose={closeCreateBookingModal}
          callback={onBook}
          room={selectedRoom}
        />
      )}
    </div>
  );
};

export default ViewHotels;
