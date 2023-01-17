import requestAxios from "../axios";
import { TOUR_PLACE } from "../constant.url";

export const fetchDestination = (id: number | string) => {
  return requestAxios(`${TOUR_PLACE}/info/${id}`, {
    method: "GET",
  });
};

export const fetchTourplace = (data?: { _limit?: string; _start?: string }) => {
  return requestAxios(`${TOUR_PLACE}`, {
    method: "GET",
    data: data,
  });
};
