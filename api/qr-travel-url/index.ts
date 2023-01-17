import requestAxios from "../axios";
import { QR_TRAVEL } from "../constant.url";

interface ISearchPosts {
  keySearch: string;
  keyWord: string;
  _limit?: number;
  _start?: number;
}

export const fetchDestinationOutstanding = (id: number | string) => {
  return requestAxios(`${QR_TRAVEL}/tour-place/outstanding-tour-places/${id}`, {
    method: "GET",
  });
};
export const fetchPosts = (id: number | string) => {
  return requestAxios(`${QR_TRAVEL}/posts/${id}`, {
    method: "GET",
  });
};
export const fetchHomeNews = () => {
  return requestAxios(`${QR_TRAVEL}/home/news`, {
    method: "GET",
  });
};
export const fetchTourPlaces = () => {
  return requestAxios(`${QR_TRAVEL}/home/home-tour-places`, {
    method: "GET",
  });
};
export const searchPosts = ({
  keySearch,
  keyWord,
  _limit,
  _start,
}: ISearchPosts) => {
  return requestAxios(
    `${QR_TRAVEL}/home/query`,
    {
      method: "GET",
      params: {
        [keySearch]: keyWord,
        _limit: _limit,
        _start: _start,
        tour_place_v2_null: false
      },
    }
  );
};
