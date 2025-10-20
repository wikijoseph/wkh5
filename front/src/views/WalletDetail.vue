<template>
  <div class="min-h-screen bg-okx-dark pb-20">
    <!-- 头部 -->
    <header class="bg-okx-gray border-b border-okx-light-gray px-4 py-4">
      <div class="flex items-center space-x-4">
        <button @click="$router.back()" class="text-okx-text">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="flex-1">
          <h1 class="text-xl font-bold text-okx-text">{{ wallet?.name }}</h1>
          <p class="text-okx-text-secondary text-sm">{{ wallet?.address?.slice(0, 10) }}...{{ wallet?.address?.slice(-8) }}</p>
        </div>
        <button class="text-okx-text-secondary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </header>
  
      <div v-if="wallet" class="p-4">
        <!-- 余额卡片 -->
        <div class="card p-6 mb-6">
          <h2 class="text-okx-text-secondary text-sm mb-2">余额</h2>
          <div class="text-3xl font-bold text-okx-text mb-4">
            {{ wallet.balance }} {{ wallet.currency }}
          </div>
          <div class="flex space-x-4">
            <button class="btn-primary flex-1">发送</button>
            <button class="btn-success flex-1">接收</button>
          </div>
        </div>
  
      <!-- 统计信息 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">总发送</div>
          <div class="text-lg font-semibold text-okx-red">${{ stats.totalSent?.toFixed(2) || '0.00' }}</div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">总接收</div>
          <div class="text-lg font-semibold text-okx-green">${{ stats.totalReceived?.toFixed(2) || '0.00' }}</div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">总收益</div>
          <div class="text-lg font-semibold" :class="stats.totalReturn >= 0 ? 'text-okx-green' : 'text-okx-red'">
            ${{ stats.totalReturn?.toFixed(2) || '0.00' }}
          </div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">收益率</div>
          <div class="text-lg font-semibold" :class="stats.totalReturnPercent >= 0 ? 'text-okx-green' : 'text-okx-red'">
            {{ stats.totalReturnPercent?.toFixed(2) || '0.00' }}%
          </div>
        </div>
      </div>

      <!-- 交易统计 -->
      <div class="card p-4 mb-6">
        <h3 class="text-lg font-semibold text-okx-text mb-4">交易统计</h3>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-okx-text">{{ stats.transactionCount || 0 }}</div>
            <div class="text-okx-text-secondary text-sm">总交易数</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-okx-green">{{ stats.profitTransactions || 0 }}</div>
            <div class="text-okx-text-secondary text-sm">盈利交易</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-okx-red">{{ stats.lossTransactions || 0 }}</div>
            <div class="text-okx-text-secondary text-sm">亏损交易</div>
          </div>
        </div>
      </div>
  
        <!-- 盈亏图表 -->
        <div class="card p-4 mb-6">
          <h3 class="text-lg font-semibold text-okx-text mb-4">盈亏统计</h3>
          <ProfitLossChart :wallet-id="walletId" />
        </div>
  
        <!-- 交易记录 -->
        <div class="card p-4">
          <h3 class="text-lg font-semibold text-okx-text mb-4">交易记录</h3>
          <TransactionList :wallet-id="walletId" />
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTransactionStore } from '../stores/transaction'
import TransactionList from '../components/TransactionList.vue'
import ProfitLossChart from '../components/ProfitLossChart.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const walletId = computed(() => Number(props.id))
const wallet = computed(() => {
  return authStore.currentUser?.wallets.find(w => w.id === walletId.value)
})
const stats = computed(() => {
  if (authStore.currentUser) {
    return transactionStore.getWalletStats(authStore.currentUser.username, walletId.value)
  }
  return {}
})

onMounted(() => {
  if (wallet.value) {
    authStore.setCurrentWallet(wallet.value)
  }
})
</script>