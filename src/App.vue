<template>
    <div class="min-h-screen bg-okx-dark">
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useWalletStore } from './stores/wallet'
  
  const walletStore = useWalletStore()
  
  onMounted(() => {
    // 初始化数据
  })
  </script>