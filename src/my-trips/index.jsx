import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import { Button } from '@/components/ui/button';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    try {
      setUserTrips([]);
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (err) {
      console.error('Error fetching user trips:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading Trips...</p>
      </div>
    );
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      <div className="mt-6 flex flex-col gap-5">
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip} />
        ))}
      </div>

      {/* Button aligned to bottom right */}
      <div className="mt-6 flex justify-end">
        <Link to="/create-trip">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}

export default MyTrips;
