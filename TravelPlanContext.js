// TravelPlanContext.js
import React, { createContext, useState } from 'react';

export const TravelPlanContext = createContext();

export const TravelPlanProvider = ({ children }) => {
  const [travelPlan, setTravelPlan] = useState({
    country: '',
    money: '',
    days: '',
  });

  return (
    <TravelPlanContext.Provider value={{ travelPlan, setTravelPlan }}>
      {children}
    </TravelPlanContext.Provider>
  );
};
