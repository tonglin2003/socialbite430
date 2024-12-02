import { useState, createContext, useEffect } from "react";
import { useLocation } from "./UserGeolocation";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  // import location and get Location from UserGeolocation file that will get user's location
  const { location, getLocation } = useLocation();

  // fetch for location, changes location variable based on user's current location
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    // async function to check if the user is logged in
    const checkAuthStatus = async () => {
      // Set isAuthChecked to false before starting the auth check
      setIsAuthChecked(false);

      try {
        // Fetch the current user from the API
        const response = await fetch("/api/auth/current_user");
        const { user } = await response.json();

        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      }

      // Set isAuthChecked to true after the auth check is complete
      setIsAuthChecked(true);
    };

    // Call the function to check the auth status
    checkAuthStatus();
  }, []);

  const signup = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  const login = async (credentials) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user } = await response.json();
        setCurrentUser(user);
        setAuthError(null);
      } else {
        setCurrentUser(null);
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setCurrentUser(null);
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  const logout = async (cb) => {
    setIsAuthChecked(false);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
      });

      if (response.ok) {
        setCurrentUser(null, cb);
        setAuthError(null);
      } else {
        const errorData = await response.json();
        setAuthError(errorData.message);
      }
    } catch (error) {
      setAuthError(error.message);
    }

    setIsAuthChecked(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthChecked,
        authError,
        signup,
        login,
        logout,
        location,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
