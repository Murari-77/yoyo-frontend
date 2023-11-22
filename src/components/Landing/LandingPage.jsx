import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Header */}
      
      <Header />
      {/* Main Content */}
      <main className="container mx-auto pl-2 py-4">
        <div className="w-[calc(100vh - 72px)]">
          <div className='flex justify-center items-center'>
            <div>
              <h2 className="text-3xl text-[#93349e] font-semibold mb-4">Welcome to our Hotel Management System</h2>
              <p className="text-lg ">
                Book Your Stay, Your Way - Seamless Hotel Booking at Your Fingertips!
              </p>
              <button className="bg-[#93349e] text-white mt-6 py-3 px-6 rounded-full" onClick={() => navigate('login')}>
                Book Now
              </button>
            </div>
            <img style={{ width: "50%", marginTop: 20, marginLeft: 30 }} src="landing.jpg" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
