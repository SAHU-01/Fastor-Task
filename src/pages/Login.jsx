import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authslice";
import { routes } from "../routes/index";

const Login = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [details, setDetails] = useState({
    phone: "",
    dial_code: "+91",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const handleChange = (e) => {
    setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);
  const handleSubmit = async () => {
    try {
      if (otpSent) {
        if (details.otp.length === 6) {
          const res = await axios.post(routes.login, details);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          dispatch(setUser(res.data.data));
          navigate("/dashboard");
        } else {
          throw new Error("OTP should be 6 digits");
        }
      } else {
        let finaldetails = details;
        delete finaldetails.otp;
        await axios.post(routes.sendOTP, finaldetails);
      }
      setOtpSent(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <input
        type="text"
        placeholder="Enter Your Number"
        name="phone"
        className="border h-10 p-2 rounded-lg outline-none"
        onChange={handleChange}
        value={details.phone}
      />
      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          name="otp"
          className="border h-10 p-2 rounded-lg outline-none"
          onChange={handleChange}
          value={details.otp}
        />
      )}
      <button
        className="p-2 border cursor-pointer bg-blue-600 text-white rounded-lg"
        name={otpSent ? "login" : "send"}
        onClick={handleSubmit}
      >
        {otpSent ? "login" : "send OTP"}
      </button>
    </div>
  );
};

export default Login;
