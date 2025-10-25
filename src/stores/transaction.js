import { defineStore } from 'pinia'
import { generateHistoricalTransactions, calculateWalletStats } from '../utils/transactionGenerator.js'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    userTransactions: {} // 按用户名存储交易数据
  }),
  
  getters: {
    getUserTransactions: (state) => {
      return (username) => state.userTransactions[username] || []
    },
    
    getTransactionsByWalletId: (state) => {
      return (username, walletId) => {
        const userTransactions = state.userTransactions[username] || []
        return userTransactions.filter(tx => tx.walletId === walletId)
      }
    },
    
    getWalletStats: (state) => {
      return (username, walletId) => {
        const userTransactions = state.userTransactions[username] || []
        const walletTransactions = userTransactions.filter(tx => tx.walletId === walletId)
        return calculateWalletStats(walletTransactions)
      }
    }
  },
  
  actions: {
    initializeUserTransactions(username, wallets, dailyReturnRange, transactionCountRange) {
      if (!this.userTransactions[username]) {
        const allTransactions = []
        
        // 为每个钱包生成历史交易记录（限制为7天）
        wallets.forEach(wallet => {
          const walletTransactions = generateHistoricalTransactions(
            wallet.id,
            7, // 只生成7天的历史数据
            dailyReturnRange,
            transactionCountRange
          )
          allTransactions.push(...walletTransactions)
        })
        
        this.userTransactions[username] = allTransactions
      }
    },
    
    generateDailyTransactions(username, wallets, dailyReturnRange, transactionCountRange) {
      const today = new Date().toISOString().split('T')[0]
      const newTransactions = []
      
      wallets.forEach(wallet => {
        const dailyTransactions = generateHistoricalTransactions(
          wallet.id,
          1, // 只生成今天的数据
          dailyReturnRange,
          transactionCountRange
        )
        newTransactions.push(...dailyTransactions)
      })
      
      // 添加到用户交易记录中
      if (!this.userTransactions[username]) {
        this.userTransactions[username] = []
      }
      this.userTransactions[username].unshift(...newTransactions)
    },
    
    addTransaction(username, transaction) {
      if (!this.userTransactions[username]) {
        this.userTransactions[username] = []
      }
      
      const newTransaction = {
        ...transaction,
        id: Date.now(),
        timestamp: new Date().toISOString()
      }
      this.userTransactions[username].unshift(newTransaction)
    }
  }
})