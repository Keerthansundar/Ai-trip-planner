import { useEffect, useState } from 'react';

const OLA_API_KEY = import.meta.env.VITE_OLA_API_KEY;

export function useOlaAutocomplete(handleInputChange) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn('Could not get location:', err);
        setUserLocation({ lat: 12.9716, lng: 77.5946 }); // Default to Bangalore
      }
    );
  }, []);

  const fetchSuggestions = async (text) => {
    if (!text || !userLocation) return;

    try {
      const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(
        text
      )}&location=${userLocation.lat},${userLocation.lng}&api_key=${OLA_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data?.predictions || []);
    } catch (error) {
      console.error('Error fetching Ola autocomplete suggestions:', error);
    }
  };

  const handleSelectPlace = (place) => {
    handleInputChange('location', place.description || place.name);
    setQuery(place.description || place.name);
    setSuggestions([]);
  };

  return {
    query,
    setQuery,
    suggestions,
    fetchSuggestions,
    handleSelectPlace,
    openDailog,
    setOpenDailog,
  };
}
