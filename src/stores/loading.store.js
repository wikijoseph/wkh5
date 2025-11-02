// stores/loading.js
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("dc.loading", {
  id: "dc.loading",
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(value) {
      this.isLoading = value;
    },
  },
});
