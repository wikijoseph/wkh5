import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    isLoggedIn: false,
    users: {
      // 默认用户数据
      'admin': {
        username: 'admin',
        password: '123456',
        displayName: '管理员账户',
        wallets: [
          {
            id: 1,
            name: '主钱包',
            address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
            balance: 2.4567,
            currency: 'ETH',
            type: 'ethereum',
            createdAt: '2024-01-15'
          },
          {
            id: 2,
            name: '交易钱包',
            address: '0x8ba1f109551bD432803012645Hac136c',
            balance: 0.1234,
            currency: 'BTC',
            type: 'bitcoin',
            createdAt: '2024-01-20'
          }
        ],
        dailyReturnRange: { min: 0.05, max: 0.07 },
        transactionCountRange: { min: 50, max: 100 }
      },
      'user1': {
        username: 'user1',
        password: 'password',
        displayName: '用户账户1',
        wallets: [
          {
            id: 3,
            name: 'DeFi钱包',
            address: '0x1234567890abcdef1234567890abcdef12345678',
            balance: 1.2345,
            currency: 'USDT',
            type: 'ethereum',
            createdAt: '2024-01-10'
          }
        ],
        dailyReturnRange: { min: 0.03, max: 0.05 },
        transactionCountRange: { min: 30, max: 80 }
      }
    }
  }),
  
  getters: {
    getUserData: (state) => {
      return (username) => state.users[username] || null
    }
  },
  
  actions: {
    login(username, password) {
      const user = this.users[username]
      if (user && (user.password === password || password === '')) {
        this.currentUser = user
        this.isLoggedIn = true
        return true
      }
      return false
    },
    
    logout() {
      this.currentUser = null
      this.isLoggedIn = false
    },
    
    addUser(userData) {
      this.users[userData.username] = userData
    },
    
    updateUserSettings(settings) {
      if (this.currentUser) {
        this.currentUser.dailyReturnRange = settings.dailyReturnRange
        this.currentUser.transactionCountRange = settings.transactionCountRange
      }
    },
    
    addUserWallet(wallet) {
      if (this.currentUser) {
        const newWallet = {
          ...wallet,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        }
        this.currentUser.wallets.push(newWallet)
      }
    },
    
    deleteUserWallet(walletId) {
      if (this.currentUser) {
        const index = this.currentUser.wallets.findIndex(wallet => wallet.id === walletId)
        if (index > -1) {
          this.currentUser.wallets.splice(index, 1)
        }
      }
    },
    
    setCurrentWallet(wallet) {
      this.currentWallet = wallet
    }
  }
})
