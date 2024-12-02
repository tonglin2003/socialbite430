import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function ShareLocationRequired({ children }) {
  const { location } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!location) {
      // need a loading...
      timeoutId = setTimeout(() => {
        setShowAlert(true);
      }, 3000);
    }

    return () => {
      // Clear the timeout if the component is unmounted
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [location]);

  // Render the link only if the location is available
  return (
    <>
      {location ? (
        children
      ) : (
        showAlert && (
          <div className="flex flex-row mx-auto my-12">
            <img className="w-64 rounded-lg" src="https://cdn.pixabay.com/photo/2016/10/06/19/59/sign-1719892_1280.png"/>
            <p className="my-12 mx-2">We need your location...</p>
          </div>
        )
      )}
    </>
  );
}
