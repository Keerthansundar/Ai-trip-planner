import { Button } from '@/components/ui/button';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { IoIosSend } from "react-icons/io";


const InfoSection = ({ trip }) => {
  const userSelection = trip?.userSelection;


  if (!userSelection) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <ClipLoader color="#3B82F6" size={40} />
        <span className="ml-3 text-sm text-gray-500 font-medium">Loading trip information...</span>
      </div>
    );
  }

  return (
    <div>
      <img
        src="/placeholder.jpg"
        alt="placeholder"
        className="h-[340px] w-full rounded object-cover object-center"
      />

    <div className='flex justify-between items-center'>
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{userSelection.location}</h2>
        <div className='flex gap-5'> 
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'> 📅 {userSelection.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'>💰 {userSelection.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'> 🫂 No.Of Traveler: {userSelection.noOfDays} </h2>
        </div>
      </div>

      <Button> <IoIosSend />  </Button>
    </div>

    </div>
  );
};

export default InfoSection;
