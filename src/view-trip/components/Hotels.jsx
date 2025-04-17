// src/components/Hotels.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Hotels = ({ trip }) => {

  const hotelList =
    trip?.tripData?.hotels?.length > 0
      ? trip.tripData.hotels
      : trip?.tripData?.travelPlan?.hotels || [];

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      {hotelList.length > 0 ? (
        <div className='my-3 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {hotelList.map((hotel, index) => {
            const photoKey = hotel.name + hotel.address;
            return (
              <Link
                key={photoKey + index}
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  hotel?.name + ', ' + hotel?.address
                )}`}
                target='_blank'
              >
                <div className='hover:scale-105 transition-all cursor-pointer'>
                  <img
                    src={'/placeholder.jpg'}
                    alt={hotel?.name}
                    className='rounded-xl w-full h-40 object-cover'
                  />
                  <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-bold text-lg'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-600'>📍 {hotel?.address}</h2>
                    <h2 className='text-sm font-semibold'>💰 {hotel?.price}</h2>
                    <h2>⭐ {hotel?.ratings?.slice(0, 3)}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic my-3">No hotel data found.</p>
      )}
    </div>
  );
};

export default Hotels;
