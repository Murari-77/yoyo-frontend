import React, { useState } from 'react';
import ViewRooms from './ViewRooms'; // Import your ViewHotels component
import ViewHotelBookings from './ViewHotelBookings'; // Import your ViewBookings component
import Header from '../Landing/Header';

const HotelDashboard = () => {
    const [showBookings, setShowBookings] = useState(false);

    return (
        <>
            <Header />
            <div className="flex">
            {/* Left Navigation */}
            <div className="w-full md:w-1/5 bg-[#93349e] text-white h-screen" style={{ height: 'calc(100vh - 72px)' }}>
                <ul className="flex flex-col items-center">
                <li className={`mt-6 text-lg cursor-pointer w-full flex justify-center items-center h-12 border' ${!showBookings ? 'bg-white text-[#93349e]' : 'text-white bg-[#93349e]'}`} onClick={() => setShowBookings(false)}>
                        View Rooms
                    </li>
                    <li className={`text-lg cursor-pointer w-full flex justify-center items-center h-12 border' ${!showBookings ? 'text-white bg-[#93349e]' : 'bg-white text-[#93349e]'}`} onClick={() => setShowBookings(true)}>
                        View Bookings
                    </li>
                </ul>
            </div>

            

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-4">
                {
                    showBookings ?
                    <ViewHotelBookings /> :
                    <ViewRooms />
                }
            </div>
        </div>
        </>
        
    );
};

export default HotelDashboard;
