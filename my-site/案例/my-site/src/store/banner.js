import { getBanners } from "@/api/banner";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchBanner(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getBanners();
      for (const i of resp) {
        i.midImg = process.env.VUE_APP_BASE_URL + i.midImg;
        i.bigImg = process.env.VUE_APP_BASE_URL + i.bigImg
      }
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
