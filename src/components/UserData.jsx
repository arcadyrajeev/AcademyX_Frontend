// components/userdata.js
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const baseURL = import.meta.env.VITE_API_URL;

export default function useUserData() {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseURL}/dashboards`, {
          method: "GET",
          credentials: "include", // important if using cookies
        });

        console.log(res);

        const userdata = await res.json();
        console.log(userdata);
        if (userdata?.data) {
          setUser(userdata.data);
        } else {
          console.warn("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    //Correct conditional fetch
    if (isLoggedIn) {
      fetchUser();
    } else {
      setIsLoading(false); // avoid hanging if not logged in
    }
  }, [isLoggedIn]); // include dependency

  return { user, isLoading };
}
