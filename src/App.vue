<template>
  <div class="min-h-screen bg-okx-dark">
    <router-view />
    <VsudLoading />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useWalletStore } from "./stores/wallet";
import VsudLoading from "./components/VsudLoading.vue";

const walletStore = useWalletStore();

onMounted(() => {
  // 初始化数据
});
</script>
