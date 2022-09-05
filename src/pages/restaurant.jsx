import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRestaurants } from "../utils";
import logo from "./Fastor.png";

export const Restaurant = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.userReducer);
  const [currRestaurant, setCurrRestaurant] = useState(null);
  useEffect(() => {
    if (user) {
      fetchRestaurants("118", user?.token)
        .then((res) => {
          const currRest = res.filter(
            (r) => String(r.restaurant_id) === params["rest_code"]
          );
          if (currRest.length) setCurrRestaurant(currRest[0]);
          else console.log("Invalid restaurant id!");
        })
        .catch(console.error);
    }
  }, [user]);
  return (
    <div>
      {currRestaurant && (
        <div className="relative">
          <img
            src={currRestaurant.images[0].url}
            alt={params["rest_code"]}
            className="h-screen w-screen absolute"
          />
          <img src={logo} className="w-screen h-screen absolute opacity-25 " />
        </div>
      )}
    </div>
  );
};
