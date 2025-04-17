import React from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  return (
    <Link to={"/view-trip/"+trip?.id}>
    <div className="border rounded-xl p-4 flex gap-4 hover:shadow-md transition-all">
      <img
        src="/placeholder.jpg"
        alt="Trip"
        className="w-[120px] h-[120px] object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-xl">{trip?.userSelection?.location}</h2>
          <p className="text-gray-600 text-sm">
            {trip?.userSelection?.noOfDays} days trip with a {trip?.userSelection?.budget} budget,
            with {trip?.userSelection?.traveler}{" "}
            {trip?.userSelection?.traveler === 1 ? "traveler" : "travelers"}
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          🗓️ <span className="font-medium text-black">Created on : </span> {trip?.createdAt?.toDate?.().toLocaleDateString() || "N/A"}
        </div>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCardItem;
