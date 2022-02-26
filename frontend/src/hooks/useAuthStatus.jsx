import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  //set log in
  const [loggedIn, setLoggedIn] = useState(false);

  //set check status

  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};
