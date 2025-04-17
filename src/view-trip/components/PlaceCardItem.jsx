import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {
  return (
    <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.name)}`}
        target='_blank'
    >
    <div className='border rounded-xl p-3 mt-2 flex gap-6 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src='/placeholder.jpg' className='w-[150px] h-[150px] rounded-xl object-cover' />

      <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-lg'>{place.name}</h2>
        <h2 className='text-sm text-gray-600'>{place.details}</h2>
        
        <div className='text-sm text-gray-600'>
          ⏱️ <span className='font-medium text-black '>Travel Time:</span> {place.time_to_travel}
        </div>

        <div className='text-sm text-gray-600'>
          💰 <span className='font-medium  text-black'>Ticket Price:</span> ₹{place.ticketPrice}
        </div>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem;
