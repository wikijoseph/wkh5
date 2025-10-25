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
          <h1 class="text-xl font-bold text-okx-text">交易历史</h1>
          <p class="text-okx-text-secondary text-sm">所有钱包交易记录</p>
        </div>
        <button @click="refreshTransactions" class="text-okx-text-secondary hover:text-okx-text">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- 统计概览 -->
    <div class="p-4">
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">总交易数</div>
          <div class="text-2xl font-bold text-okx-text">{{ allTransactions.length }}</div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">总收益</div>
          <div class="text-2xl font-bold" :class="totalReturn >= 0 ? 'text-okx-green' : 'text-okx-red'">
            ${{ totalReturn.toFixed(2) }}
          </div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">盈利交易</div>
          <div class="text-2xl font-bold text-okx-green">{{ profitCount }}</div>
        </div>
        <div class="card p-4">
          <div class="text-okx-text-secondary text-sm">亏损交易</div>
          <div class="text-2xl font-bold text-okx-red">{{ lossCount }}</div>
        </div>
      </div>

      <!-- 筛选器 -->
      <div class="card p-4 mb-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            class="px-3 py-1 rounded-full text-sm transition-colors"
            :class="activeFilter === filter.id 
              ? 'bg-okx-blue text-white' 
              : 'bg-okx-light-gray text-okx-text-secondary hover:bg-gray-600'"
          >
            {{ filter.name }}
          </button>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索交易记录..."
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text placeholder-okx-text-secondary focus:outline-none focus:border-okx-blue"
            />
          </div>
          <select
            v-model="selectedWallet"
            class="bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
          >
            <option value="">所有钱包</option>
            <option v-for="wallet in wallets" :key="wallet.id" :value="wallet.id">
              {{ wallet.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- 交易列表 -->
      <div class="space-y-3">
        <div
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
          class="card p-4 cursor-pointer hover:bg-okx-light-gray transition-colors"
          @click="goToWalletDetail(transaction.walletId)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                :class="transaction.type === 'send' ? 'bg-okx-red' : 'bg-okx-green'"
              >
                {{ transaction.cryptoInfo?.logo || '💰' }}
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="text-okx-text font-medium">
                    {{ transaction.type === 'send' ? '发送' : '接收' }}
                  </span>
                  <span class="text-okx-text-secondary text-sm">
                    {{ transaction.cryptoInfo?.name || transaction.currency }}
                  </span>
                  <span class="text-xs text-okx-text-secondary">
                    {{ getWalletName(transaction.walletId) }}
                  </span>
                </div>
                <div class="text-okx-text-secondary text-sm">
                  {{ formatDate(transaction.timestamp) }}
                </div>
                <div class="text-xs text-okx-text-secondary">
                  {{ transaction.hash.slice(0, 8) }}...{{ transaction.hash.slice(-8) }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div 
                class="font-semibold"
                :class="transaction.type === 'send' ? 'text-okx-red' : 'text-okx-green'"
              >
                {{ transaction.type === 'send' ? '-' : '+' }}{{ transaction.amount }} {{ transaction.currency }}
              </div>
              <div class="text-okx-text-secondary text-sm">
                ${{ transaction.value?.toFixed(2) || '0.00' }}
              </div>
              <div 
                class="text-xs font-medium"
                :class="transaction.return >= 0 ? 'text-okx-green' : 'text-okx-red'"
              >
                {{ transaction.return >= 0 ? '+' : '' }}{{ transaction.returnPercent?.toFixed(2) || '0.00' }}%
              </div>
              <div class="text-xs text-okx-text-secondary">
                {{ transaction.status }}
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="isLoading" class="text-center py-12 text-okx-text-secondary">
          <svg class="w-8 h-8 mx-auto mb-4 animate-spin text-okx-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <div class="text-lg font-medium">加载中...</div>
        </div>
        
        <div v-else-if="filteredTransactions.length === 0" class="text-center py-12 text-okx-text-secondary">
          <svg class="w-16 h-16 mx-auto mb-4 text-okx-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <div class="text-lg font-medium mb-2">暂无交易记录</div>
          <div class="text-sm">尝试调整筛选条件或添加更多钱包</div>
        </div>

        <!-- 分页控件 -->
        <div v-if="!isLoading && filteredTransactions.length > 0" class="flex justify-center items-center space-x-4 mt-6">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-4 py-2 bg-okx-light-gray text-okx-text rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            上一页
          </button>
          <span class="text-okx-text-secondary">
            第 {{ currentPage }} 页
          </span>
          <button
            @click="currentPage = currentPage + 1"
            :disabled="filteredTransactions.length < pageSize"
            class="px-4 py-2 bg-okx-light-gray text-okx-text rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTransactionStore } from '../stores/transaction'

const router = useRouter()
const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const activeFilter = ref('all')
const searchQuery = ref('')
const selectedWallet = ref('')
const isLoading = ref(false)
const currentPage = ref(1)
const pageSize = 50

const filters = [
  { id: 'all', name: '全部' },
  { id: 'profit', name: '盈利' },
  { id: 'loss', name: '亏损' },
  { id: 'send', name: '发送' },
  { id: 'receive', name: '接收' }
]

const wallets = computed(() => authStore.currentUser?.wallets || [])
const allTransactions = computed(() => {
  if (!authStore.currentUser) return []
  return transactionStore.getUserTransactions(authStore.currentUser.username)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 1000) // 限制最多显示1000条记录
})

const filteredTransactions = computed(() => {
  let filtered = allTransactions.value

  // 按筛选器过滤
  if (activeFilter.value === 'profit') {
    filtered = filtered.filter(tx => tx.return > 0)
  } else if (activeFilter.value === 'loss') {
    filtered = filtered.filter(tx => tx.return < 0)
  } else if (activeFilter.value === 'send') {
    filtered = filtered.filter(tx => tx.type === 'send')
  } else if (activeFilter.value === 'receive') {
    filtered = filtered.filter(tx => tx.type === 'receive')
  }

  // 按钱包过滤
  if (selectedWallet.value) {
    filtered = filtered.filter(tx => tx.walletId === Number(selectedWallet.value))
  }

  // 按搜索查询过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tx => 
      tx.currency.toLowerCase().includes(query) ||
      tx.cryptoInfo?.name?.toLowerCase().includes(query) ||
      tx.hash.toLowerCase().includes(query)
    )
  }

  // 分页处理
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filtered.slice(startIndex, endIndex)
})

const totalReturn = computed(() => {
  return allTransactions.value.reduce((sum, tx) => sum + (tx.return || 0), 0)
})

const profitCount = computed(() => {
  return allTransactions.value.filter(tx => tx.return > 0).length
})

const lossCount = computed(() => {
  return allTransactions.value.filter(tx => tx.return < 0).length
})

const getWalletName = (walletId) => {
  const wallet = wallets.value.find(w => w.id === walletId)
  return wallet?.name || '未知钱包'
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goToWalletDetail = (walletId) => {
  router.push(`/wallet/${walletId}`)
}

const refreshTransactions = async () => {
  if (!authStore.currentUser) return
  
  isLoading.value = true
  currentPage.value = 1
  
  try {
    // 重新生成今日交易记录
    transactionStore.generateDailyTransactions(
      authStore.currentUser.username,
      authStore.currentUser.wallets,
      authStore.currentUser.dailyReturnRange,
      authStore.currentUser.transactionCountRange
    )
    
    // 模拟加载时间
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // 不自动初始化大量数据，让用户手动刷新
  console.log('Transactions page mounted')
})
</script>
