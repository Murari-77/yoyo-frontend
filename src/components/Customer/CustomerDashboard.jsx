import React, { useContext, useState } from 'react';
import ViewHotels from './ViewHotels'; // Import your ViewHotels component
import ViewMyBookings from './ViewMyBookings'; // Import your ViewBookings component
import Header from '../Landing/Header';
import { UserContext } from '../../App';

const CustomerDashboard = () => {

    const [showBookings, setShowBookings] = useState(false);

    const onToggle = () => {
        setShowBookings(booking => !booking)
    }

    return (
        <>
            <Header />
            <div className="flex">
            {/* Left Navigation */}
            <div className="w-full md:w-1/5 bg-[#93349e] text-white h-screen" style={{ height: 'calc(100vh - 72px)' }}>
                <ul className="flex flex-col items-center">
                    <li className={`mt-6 text-lg cursor-pointer w-full flex justify-center items-center h-12 border' ${!showBookings ? 'bg-white text-[#93349e]' : 'text-white bg-[#93349e]'}`} onClick={() => setShowBookings(false)}>
                        View Hotels
                    </li>
                    <li className={`text-lg cursor-pointer w-full flex justify-center items-center h-12 border' ${!showBookings ? 'text-white bg-[#93349e]' : 'bg-white text-[#93349e]'}`} onClick={() => setShowBookings(true)}>
                        View My Bookings
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-full p-4">
                {
                    showBookings ?
                    <ViewMyBookings /> :
                    <ViewHotels toggle={onToggle} />
                }
            </div>
        </div>
        </>
        
    );
};

export default CustomerDashboard;
