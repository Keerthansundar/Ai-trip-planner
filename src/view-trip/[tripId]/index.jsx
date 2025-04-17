import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true); // track loading state

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document: ", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
        toast("No Trip Found !!");
      }
    } catch (err) {
      console.error("Error fetching trip:", err);
      toast("Something went wrong!");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-52 flex flex-col gap-6'>
      {/* InfoSection will show loader internally */}
      <InfoSection trip={trip} />

      {/* Show Hotels and Itinerary only after trip data is loaded */}
      {!loading && trip?.userSelection && (
        <>
          <Hotels trip={trip} />
          <PlacesToVisit trip={trip} />
          <Footer/>
        </>
      )}
    </div>
  );
}

export default ViewTrip;
