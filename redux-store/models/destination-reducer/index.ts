import { fetchDestination } from "@/api/tourplace-url";
import { fetchDestinationOutstanding } from "@/api/qr-travel-url";
import { DestinationType } from "@/models/Destination";
import { createModel } from "@rematch/core";
import { RootModel } from "../index";

export const destination = createModel<RootModel>()({
  state: {
    dataDestination: { category_info: [] } as DestinationType,
    dataOutstanding: [],
    isLoadingBannerDestination: true as boolean,
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
    async fetchDestination(payload: number | string) {
      dispatch.destination.updateData({
        isLoadingBannerDestination: true,
      });
      const result = await fetchDestination(payload);
      dispatch.destination.updateData({
        dataDestination: result,
        isLoadingBannerDestination: false,
      });
    },
    async fetchDestinationOutstanding(payload: number | string) {
      const result = await fetchDestinationOutstanding(payload);
      dispatch.destination.updateData({
        dataOutstanding: result,
      });
    },
  }),
});
