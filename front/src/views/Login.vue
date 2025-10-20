<template>
  <div class="min-h-screen bg-okx-dark flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo区域 -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-okx-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-okx-text mb-2">H5钱包</h1>
        <p class="text-okx-text-secondary">安全便捷的数字资产管理</p>
      </div>

      <!-- 登录表单 -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-okx-text mb-6 text-center">登录账户</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">用户名</label>
            <input
              v-model="form.username"
              type="text"
              class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-4 py-3 text-okx-text focus:outline-none focus:border-okx-blue transition-colors"
              placeholder="请输入用户名"
              required
            />
          </div>
          
          <div>
            <label class="block text-okx-text-secondary text-sm mb-2">密码</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full bg-okx-light-gray border border-okx-text-secondary rounded-lg px-4 py-3 pr-12 text-okx-text focus:outline-none focus:border-okx-blue transition-colors"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-okx-text-secondary hover:text-okx-text"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="text-okx-red text-sm text-center">
            {{ errorMessage }}
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              登录中...
            </span>
            <span v-else>登录</span>
          </button>
        </form>

        <!-- 测试账户提示 -->
        <div class="mt-6 p-4 bg-okx-light-gray rounded-lg">
          <h3 class="text-okx-text font-semibold mb-2">测试账户</h3>
          <div class="space-y-1 text-sm text-okx-text-secondary">
            <div>用户名: admin, 密码: 123456</div>
            <div>用户名: user1, 密码: password</div>
          </div>
        </div>

        <!-- 功能演示链接 -->
        <div class="mt-4 text-center">
          <button
            @click="$router.push('/demo')"
            class="text-okx-blue hover:text-blue-400 text-sm underline"
          >
            查看功能演示
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTransactionStore } from '../stores/transaction'

const router = useRouter()
const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const form = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const success = authStore.login(form.value.username, form.value.password)
    
    if (success) {
      // 初始化用户交易数据
      const user = authStore.currentUser
      transactionStore.initializeUserTransactions(
        user.username,
        user.wallets,
        user.dailyReturnRange,
        user.transactionCountRange
      )
      
      // 跳转到首页
      router.push('/')
    } else {
      errorMessage.value = '用户名或密码错误'
    }
  } catch (error) {
    errorMessage.value = '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>
