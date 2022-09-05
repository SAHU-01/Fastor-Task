import React, { useEffect } from "react";
import "./index.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/authslice";
import { Dashboard } from "./pages/dashboard";
import { Restaurant } from "./pages/restaurant";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const getUser = () => {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(tempUser));
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
    return () => {};
  }, []);

  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/restaurant/:rest_code" element={<Restaurant />} />
      </Routes>
    </>
  );
};

export default App;
