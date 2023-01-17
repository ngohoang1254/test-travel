import { fetchPosts, searchPosts } from "@/api/qr-travel-url";
import { IPosts } from "@/models/Posts";
import { createModel } from "@rematch/core";
import { RootModel } from "../index";
import { IDontMiss } from "@/models/DontMiss";

export const posts = createModel<RootModel>()({
  state: {
    dataPosts: {} as IPosts,
    dataSearchPosts: { data: [], total: 0 } as {
      data: IDontMiss[];
      total: number;
    },
    searchParams: {} as {
      keyWord: string;
      _limit: number;
      _start: number;
      _total: number;
    },
    dataSuggestNotFound: [] as IDontMiss[],
    isLoadingBannerPosts: true,
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
    async fetchPosts(payload: number | string) {
      dispatch.posts.updateData({
        isLoadingBannerPosts: true,
      });
      const result = await fetchPosts(payload);
      dispatch.posts.updateData({
        dataPosts: result,
      });
    },

    async searchPosts({ keySearch, keyWord, _limit = -1, _start = 0 }) {
      const result = await searchPosts({
        keySearch,
        keyWord,
        _limit,
        _start,
      });
      dispatch.posts.updateData({
        dataSearchPosts: result,
        searchParams: {
          keySearch: keySearch,
          keyWord: keyWord,
          _limit: _limit,
          _start: _start,
          _total: result?.total,
        },
      });
    },

    async scrollSearchPosts(
      { keySearch, keyWord, _limit = -1, _start = 0 },
      state
    ) {
      const result = await searchPosts({
        keySearch,
        keyWord,
        _limit,
        _start,
      });
      const customResult = {
        ...result,
        data: state?.posts?.dataSearchPosts?.data?.concat(result.data),
      };

      dispatch.posts.updateData({
        dataSearchPosts: customResult,
        searchParams: {
          keySearch: keySearch,
          keyWord: keyWord,
          _limit: _limit,
          _start: _start,
          _total: result?.total,
        },
      });
    },

    async fetchSuggestPosts({ keyWord, _limit = 4, _start = 0 }) {
      const result = await searchPosts({
        keySearch: "title_contains",
        keyWord,
        _limit,
        _start,
      });
      dispatch.posts.updateData({
        dataSuggestNotFound: result?.data,
      });
    },
  }),
});
