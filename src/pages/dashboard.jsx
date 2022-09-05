import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { routes } from "../routes/index";
import { fetchRestaurants } from "../utils";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const [cityId, setCityId] = useState("118");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
    return () => {};
  }, []);

  useEffect(() => {
    if (user) {
      fetchRestaurants(cityId, user?.token)
        .then((res) => {
          setRestaurants(res);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="w-screen h-screen p-4 flex flex-col gap-3">
      <code>
        Note: In real world scenario, this input will be a list of cities which
        will mapped to unique city_ids
      </code>
      <hr />
      <div className="flex gap-3 jus">
        <input
          type="text"
          placeholder="Enter Your City Id"
          name="city_id"
          className="border h-10 p-2 rounded-lg outline-none"
          onChange={(e) => {
            setCityId(e.target.value);
          }}
          value={cityId}
        />
        <button
          className="bg-blue-600 p-2 rounded-md text-white cursor-pointer"
          onClick={fetchRestaurants}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {restaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant.restaurant_id}
              to={`/restaurant/${restaurant.restaurant_id}`}
            >
              <div className="bg-green-400 w-48 p-3 rounded-md shadow-lg cursor-pointer">
                {restaurant.restaurant_name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
