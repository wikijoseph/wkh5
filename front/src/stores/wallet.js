import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
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
    currentWallet: null
  }),
  
  getters: {
    totalBalance: (state) => {
      return state.wallets.reduce((total, wallet) => total + wallet.balance, 0)
    },
    getWalletById: (state) => {
      return (id) => state.wallets.find(wallet => wallet.id === id)
    }
  },
  
  actions: {
    addWallet(wallet) {
      const newWallet = {
        ...wallet,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      this.wallets.push(newWallet)
    },
    
    deleteWallet(id) {
      const index = this.wallets.findIndex(wallet => wallet.id === id)
      if (index > -1) {
        this.wallets.splice(index, 1)
      }
    },
    
    setCurrentWallet(wallet) {
      this.currentWallet = wallet
    }
  }
})