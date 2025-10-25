<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-okx-gray rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-okx-text mb-4">添加钱包</h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">钱包名称</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
              placeholder="输入钱包名称"
              required
            />
          </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">钱包地址</label>
            <input
              v-model="form.address"
              type="text"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
              placeholder="输入钱包地址"
              required
            />
          </div>
          
        <div>
          <label class="block text-okx-text-secondary text-sm mb-2">币种</label>
          <select
            v-model="form.currency"
            class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
            required
          >
            <option v-for="crypto in cryptoCurrencies" :key="crypto.symbol" :value="crypto.symbol">
              {{ crypto.logo }} {{ crypto.symbol }} - {{ crypto.name }}
            </option>
          </select>
        </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">钱包类型</label>
            <select
              v-model="form.type"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
              required
            >
              <option value="ethereum">以太坊</option>
              <option value="bitcoin">比特币</option>
              <option value="tron">波场</option>
            </select>
          </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">余额</label>
            <input
              v-model.number="form.balance"
              type="number"
              step="0.0001"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
              placeholder="0.0000"
              required
            />
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-okx-light-gray text-okx-text py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              class="flex-1 btn-primary"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { cryptoCurrencies } from '../data/cryptoData.js'

const emit = defineEmits(['close', 'add'])

const form = ref({
  name: '',
  address: '',
  currency: 'BTC',
  type: 'bitcoin',
  balance: 0
})

const handleSubmit = () => {
  emit('add', { ...form.value })
  form.value = {
    name: '',
    address: '',
    currency: 'BTC',
    type: 'bitcoin',
    balance: 0
  }
}
</script>