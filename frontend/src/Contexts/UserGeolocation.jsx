import React, { useState } from "react";
// import axios from "axios";

// get user location from the backend, latitude and longitude
export const getUserLocation = async () => {
  try {
    const response = await fetch("/api/user/location");

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null;
  }
};

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  const postLocation = async (latitude, longitude) => {
    const data = {
      latitude: latitude,
      longitude: longitude,
    };

    const response = await fetch("/api/user/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert the data to a JSON string
    });

    if (!response.ok) {
      return false;
    } else {
      return true;
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (postLocation(latitude, longitude)) {
            setLocation({ latitude, longitude });
          } else {
            console.error("Error getting user's location");
          }
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return { location, getLocation };
};
