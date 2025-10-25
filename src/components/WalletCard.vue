<template>
    <div 
      class="card p-4 cursor-pointer hover:bg-okx-light-gray transition-colors"
      @click="$emit('click')"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-okx-blue rounded-full flex items-center justify-center">
            <span class="text-white font-bold">{{ wallet.currency.charAt(0) }}</span>
          </div>
          <div>
            <h4 class="text-okx-text font-semibold">{{ wallet.name }}</h4>
            <p class="text-okx-text-secondary text-sm">{{ wallet.address.slice(0, 6) }}...{{ wallet.address.slice(-4) }}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-okx-text font-semibold">{{ wallet.balance }} {{ wallet.currency }}</div>
          <div class="text-okx-text-secondary text-sm">{{ wallet.type }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    wallet: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['click'])
  </script>