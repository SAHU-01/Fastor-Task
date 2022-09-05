import axios from "axios";
import { routes } from "../routes";

export const fetchRestaurants = (cityId, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${routes.fetchRestaurants}?city_id=${cityId}&&`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
