import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App.js';
import ApiCall from '../../services/api.js';

const ViewHotelBookings = () => {
  const { user } = useContext(UserContext)

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingsByHotelId = async () => {
      try {
        // Fetch bookings by hotel ID (replace 'hotelId' with the actual hotel ID)
        const response = await ApiCall.post('/api/bookings/getbookingsbyhotelid', { hotelid: user.userDetails._id });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching hotel bookings:', error);
      }
    };

    fetchBookingsByHotelId();
  }, []);

  const handleBookNow = (hotelId) => {
    // Handle booking action for the selected hotel
    console.log(`Book Now clicked for Hotel ID: ${hotelId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">View Hotel Bookings</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.roomid?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.userid?.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.totalamount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.totaldays}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewHotelBookings;
