import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  const itineraryList =
    trip?.tripData?.itinerary?.length > 0
      ? trip.tripData.itinerary
      : trip?.tripData?.travelPlan?.itinerary || [];

  return (
    <div>
      <h2 className='font-bold text-xl mb-4'>Places to Visit</h2>

      <div>
        {itineraryList.length > 0 ? (
          itineraryList.map((dayItem, index) => (
            <div key={index} className='mb-[50px] mt-[30px]'>
              <h3 className='font-medium text-lg mb-2'>🗓️ {dayItem.day}</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {dayItem.places?.map((place, idx) => (
                  <div key={idx} className='flex flex-col gap-1'>
                    <h2 className='font-medium text-sm text-orange-500'>{place.best_time_to_visit}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic my-3">No place data found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesToVisit;
