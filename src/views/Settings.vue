<template>
  <div class="min-h-screen bg-okx-dark">
    <header class="bg-okx-gray border-b border-okx-light-gray px-4 py-4">
      <div class="flex items-center space-x-4">
        <button @click="$router.back()" class="text-okx-text">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="text-xl font-bold text-okx-text">设置</h1>
      </div>
    </header>

    <div class="p-4 space-y-6">
      <!-- 交易配置 -->
      <div class="card p-4">
        <h3 class="text-lg font-semibold text-okx-text mb-4">交易配置</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">日收益范围 (%)</label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最小值</label>
                <input
                  v-model.number="settings.dailyReturnRange.min"
                  type="number"
                  step="0.01"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                />
              </div>
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最大值</label>
                <input
                  v-model.number="settings.dailyReturnRange.max"
                  type="number"
                  step="0.01"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
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
                  v-model.number="settings.transactionCountRange.min"
                  type="number"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                />
              </div>
              <div>
                <label class="block text-xs text-okx-text-secondary mb-1">最大值</label>
                <input
                  v-model.number="settings.transactionCountRange.max"
                  type="number"
                  class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-3 py-2 text-okx-text focus:outline-none focus:border-okx-blue"
                />
              </div>
            </div>
          </div>
          
          <button @click="saveSettings" class="w-full btn-primary">
            保存设置
          </button>
        </div>
      </div>

      <!-- 钱包管理 -->
      <div class="card p-4">
        <h3 class="text-lg font-semibold text-okx-text mb-4">钱包管理</h3>
        <div class="space-y-3">
          <div
            v-for="wallet in wallets"
            :key="wallet.id"
            class="flex items-center justify-between p-3 bg-okx-light-gray rounded-lg"
          >
            <div>
              <div class="text-okx-text font-medium">{{ wallet.name }}</div>
              <div class="text-okx-text-secondary text-sm">{{ wallet.address.slice(0, 10) }}...</div>
            </div>
            <button
              @click="deleteWallet(wallet.id)"
              class="text-okx-red hover:text-red-400"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 应用设置 -->
      <div class="card p-4">
        <h3 class="text-lg font-semibold text-okx-text mb-4">应用设置</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-okx-text">深色模式</span>
            <div class="w-12 h-6 bg-okx-blue rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-okx-text">推送通知</span>
            <div class="w-12 h-6 bg-okx-light-gray rounded-full relative">
              <div class="w-5 h-5 bg-okx-text-secondary rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const wallets = computed(() => authStore.currentUser?.wallets || [])

const settings = ref({
  dailyReturnRange: { min: 0.05, max: 0.07 },
  transactionCountRange: { min: 50, max: 100 }
})

onMounted(() => {
  if (authStore.currentUser) {
    settings.value = {
      dailyReturnRange: { ...authStore.currentUser.dailyReturnRange },
      transactionCountRange: { ...authStore.currentUser.transactionCountRange }
    }
  }
})

const saveSettings = () => {
  authStore.updateUserSettings(settings.value)
  alert('设置已保存！')
}

const deleteWallet = (id) => {
  if (confirm('确定要删除这个钱包吗？')) {
    authStore.deleteUserWallet(id)
  }
}
</script>