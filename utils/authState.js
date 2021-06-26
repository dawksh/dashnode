import { fireAuth } from "./firebase";
import { useState } from "react";

const useAuthState = () => {
  const [uid, setUid] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  fireAuth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      setIsLoggedIn(true);
    } else if (!user) {
      setUid(null);
      setIsLoggedIn(false);
    }
  });
  return [isLoggedIn, uid];
};

export { useAuthState };
