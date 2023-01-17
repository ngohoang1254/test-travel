import { fetchTourplace } from "@/api/tourplace-url";
import { ITourplaceDestination } from "@/models/Tourplace";
import { createModel } from "@rematch/core";
import { RootModel } from "../index";

export const tourplace = createModel<RootModel>()({
  state: {
    dataTourplace: { data: [] as ITourplaceDestination[], total: 0 as number },
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async fetchTourplace(data?: { _limit?: string; _start?: string }) {
      const result = await fetchTourplace(data);
      dispatch.tourplace.updateData({
        dataTourplace: result,
      });
    },
  }),
});
