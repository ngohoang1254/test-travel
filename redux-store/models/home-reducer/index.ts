import { fetchHomeNews, fetchTourPlaces } from "@/api/qr-travel-url";
import { DestinationType } from "@/models/Destination";
import { createModel } from "@rematch/core";
import { RootModel } from "../index";

export const home = createModel<RootModel>()({
  state: {
    listDontMiss: [],
    listTourPlaces: [] as DestinationType[],
    isLoadingBannerHome: true
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchHomeNews() {
      const result = await fetchHomeNews();
      dispatch.home.updateData({
        listDontMiss: result,
      });
    },
    async fetchTourPlaces() {
      const result = await fetchTourPlaces();
      dispatch.home.updateData({
        listTourPlaces: result,
      });
    },
  }),
});
