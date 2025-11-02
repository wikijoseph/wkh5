<template>
  <div>
    <div v-if="loadingStore.isLoading" class="loading-overlay">
      <img src="../assets/load.gif" width="100px" />
    </div>
  </div>
</template>

<script>
import { useLoadingStore } from "@/stores/loading.store";

export default {
  setup() {
    const loadingStore = useLoadingStore();
    return { loadingStore };
  },
};
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
