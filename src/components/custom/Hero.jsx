import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


const Hero = () => {
  
  return (
    <div className='flex flex-col items-center mx-56 gap-9'> 
        <h1 className='font-extrabold text-[60px] text-center mt-16 '> 
           <span className='text-[#f56551]'> Discover your next Adventure with AI: </span> Personalized Itineraries
        </h1>
        <p className='text-xl text-gray-500 text-center'>Your personel trip planner and travel curator, creating itineraries tailored to your interests and budget.</p>
        
        <Link to={'/create-trip'}>
            <Button>Get started, It's Free</Button>
        </Link>

        <img src='mockUp.png' className='mt-20 mb-20' />
    </div>
  )
}

export default Hero;