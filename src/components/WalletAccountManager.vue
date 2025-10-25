<template>
  <div class="space-y-4">
    <!-- 账户列表 -->
    <div class="space-y-3">
      <div
        v-for="account in accounts"
        :key="account.id"
        class="bg-okx-gray rounded-xl p-4 cursor-pointer hover:bg-okx-light-gray transition-colors"
        @click="selectAccount(account)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-lg font-bold">{{ account.name.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <div class="text-okx-text font-medium">{{ account.name }}</div>
              <div class="text-okx-text-secondary text-sm">{{ account.wallets.length }} 个钱包</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-okx-text font-semibold">${{ account.totalValue.toFixed(2) }}</div>
            <div class="text-okx-green text-sm flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5z"/>
              </svg>
              +{{ account.totalReturnPercent.toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加账户按钮 -->
    <button
      @click="showAddAccount = true"
      class="w-full bg-okx-light-gray border-2 border-dashed border-okx-text-secondary rounded-xl p-6 text-center hover:border-okx-blue hover:bg-okx-gray transition-colors"
    >
      <svg class="w-8 h-8 text-okx-text-secondary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      <div class="text-okx-text-secondary">添加新账户</div>
    </button>

    <!-- 添加账户模态框 -->
    <div v-if="showAddAccount" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-okx-gray rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-bold text-okx-text mb-4">添加新账户</h3>
        
        <form @submit.prevent="handleAddAccount" class="space-y-4">
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">账户名称</label>
            <input
              v-model="newAccount.name"
              type="text"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
              placeholder="输入账户名称"
              required
            />
          </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">日收益范围 (%)</label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最小值</label>
                <input
                  v-model.number="newAccount.dailyReturnRange.min"
                  type="number"
                  step="0.01"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                  required
                />
              </div>
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最大值</label>
                <input
                  v-model.number="newAccount.dailyReturnRange.max"
                  type="number"
                  step="0.01"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">每日交易数量范围</label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最小值</label>
                <input
                  v-model.number="newAccount.transactionCountRange.min"
                  type="number"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                  required
                />
              </div>
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最大值</label>
                <input
                  v-model.number="newAccount.transactionCountRange.max"
                  type="number"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                  required
                />
              </div>
            </div>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="showAddAccount = false"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTransactionStore } from '../stores/transaction'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const showAddAccount = ref(false)
const newAccount = ref({
  name: '',
  dailyReturnRange: { min: 0.05, max: 0.07 },
  transactionCountRange: { min: 50, max: 100 }
})

const accounts = computed(() => {
  return Object.keys(authStore.users).map(username => {
    const user = authStore.users[username]
    const totalValue = user.wallets.reduce((sum, wallet) => sum + (wallet.balance * 2000), 0)
    const transactions = transactionStore.getUserTransactions(username)
    const totalReturn = transactions.reduce((sum, tx) => sum + tx.return, 0)
    const totalReturnPercent = totalValue > 0 ? (totalReturn / totalValue) * 100 : 0
    
    return {
      id: username,
      name: user.displayName || username,
      username,
      wallets: user.wallets,
      totalValue,
      totalReturn,
      totalReturnPercent
    }
  })
})

const selectAccount = (account) => {
  authStore.login(account.username, '') // 直接切换账户
}

const handleAddAccount = () => {
  const username = newAccount.value.name.toLowerCase().replace(/\s+/g, '')
  const password = 'password123' // 默认密码
  
  // 添加新用户
  authStore.addUser({
    username,
    password,
    displayName: newAccount.value.name,
    wallets: [],
    dailyReturnRange: newAccount.value.dailyReturnRange,
    transactionCountRange: newAccount.value.transactionCountRange
  })
  
  // 重置表单
  newAccount.value = {
    name: '',
    dailyReturnRange: { min: 0.05, max: 0.07 },
    transactionCountRange: { min: 50, max: 100 }
  }
  
  showAddAccount.value = false
}
</script>
