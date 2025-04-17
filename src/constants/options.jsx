export const SelectTravelersList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A solo traveler in exploration',
      icon: '✈️',
      people: '1 person',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '🥂',
      people: '2 People',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '👨‍👩‍👧‍👦',
      people: '5 to 10 People',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of buddies on an adventure',
      icon: '🧑‍🤝‍🧑',
      people: '3 to 6 People',
    }
  ];
  

export const selectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '🪙',
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Balanced comfort and cost',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Premium experiences & comfort',
      icon: '💸',
    }
  ];

  export const AI_PROMPT = `
  Generate a detailed valid JSON format with the following structure:
  
  1. Location: {location}
  2. Duration: {noOfDays} days
  3. Traveler Type: {traveler}
  4. Budget: {budget}
  
  The response should include:
  
  - "hotels": A list of hotel options with:
    - "name": Name of the hotel
    - "address": Full address
    - "price": Price range (e.g., ₹3500-₹4500 per night)
    - "imageUrl": A valid image URL from Google
    - "geoCoordinates": Latitude and longitude
    - "ratings": User ratings (e.g., 4.5/5)
    - "description": A short summary of the hotel
  
  - "itinerary": A list where each item represents a day’s plan (length = {noOfDays}):
    - "day": Day number (e.g., Day 1, Day 2, etc.)
    - "places": List of places to visit that day, and each place contains:
      - "name": Name of the place
      - "details": Short description
      - "imageUrl": A valid image URL from Google
      - "geoCoordinates": Latitude and longitude
      - "ticketPrice": Entry fee if applicable
      - "time_to_travel": Approximate time to travel
      - "best_time_to_visit": Recommended time
  
  Return only valid and clean JSON without explanations or extra text.
  `;
  
  
    