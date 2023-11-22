import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.js';
import ApiCall from '../../services/api.js';

const ViewBookings = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookingsByUserId = async () => {
      try {
        const response = await ApiCall.post('/api/bookings/getbookingsbyuserid', { userid: user.userDetails._id });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookingsByUserId();
  }, [user.userDetails._id]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await ApiCall.post('/api/bookings/cancelbooking', { bookingid: bookingId });
      console.log(response);
      // Refresh the bookings list after cancellation
      const updatedBookings = await ApiCall.post('/api/bookings/getbookingsbyuserid', { userid: user.userDetails._id });
      setBookings(updatedBookings.data);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">View My Bookings</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            {/* Add more table headers based on booking model */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.roomid?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.roomid?.hotel?.hotelName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.totalamount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.totaldays}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {booking.status == 'Booked' ? (
                  <button onClick={() => handleCancelBooking(booking._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Cancel Booking
                  </button>
                ) : (
                  <div>-</div>
                )}
              </td>
              {/* Add more table cells based on booking model */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBookings;
