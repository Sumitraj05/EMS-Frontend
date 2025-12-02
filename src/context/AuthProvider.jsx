import React, { createContext, useEffect, useState } from 'react';
import httpAction from '../utils/httpAction';
import apis from '../api/apis';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserdata] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  // =============================
  // STEP 1: Load saved user on refresh
  // =============================
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserdata(parsed);
        if (parsed._id || parsed.userId) {
          fetchTasks(parsed._id || parsed.userId);
        }
      } catch (err) {
        console.error("Error parsing saved user:", err);
        localStorage.removeItem("userInfo");
      }
    }

    verifyUserFromServer(); // optional backend validation
  }, []);

  // =============================
  // STEP 2: Verify user from backend (optional but recommended)
  // =============================
  const verifyUserFromServer = async () => {
    try {
      const response = await httpAction({
        url: apis().getUserDetails,
        method: "GET",
        credentials: "include",
      });

      if (response?.status) {
        const fresh = response.user;

        setUserdata(fresh);
        localStorage.setItem("userInfo", JSON.stringify(fresh));

        if (fresh._id || fresh.userId) {
          fetchTasks(fresh._id || fresh.userId);
        }
      } else {
        // Backend says no user session
        setUserdata(null);
        localStorage.removeItem("userInfo");
      }
    } catch (error) {
      console.error("User verify error:", error);
      localStorage.removeItem("userInfo");
      setUserdata(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // =============================
  // STEP 3: Fetch tasks
  // =============================
  const fetchTasks = async (employeeId) => {
    try {
      const response = await httpAction({
        url: ${apis().getTasks}/${employeeId},
        method: 'GET',
        credentials: "include",
      });

      if (response?.status) {
        setTasks(response.tasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserdata,
        tasks,
        setTasks,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;