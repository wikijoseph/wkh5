import { getRandomCrypto } from '../data/cryptoData.js'

// 生成指定日期的交易记录
export function generateDailyTransactions(walletId, date, dailyReturnRange, transactionCountRange) {
  const transactions = []
  const transactionCount = Math.floor(
    Math.random() * (transactionCountRange.max - transactionCountRange.min + 1) + transactionCountRange.min
  )
  
  // 计算目标总收益（百分比）
  const targetReturnPercent = Math.random() * (dailyReturnRange.max - dailyReturnRange.min) + dailyReturnRange.min
  const targetReturnAmount = targetReturnPercent / 100 // 转换为小数
  
  // 生成交易记录
  let totalReturn = 0
  const baseValue = 10000 // 基础价值，用于计算收益
  
  // 预生成所有交易的基本信息
  const transactionTemplates = []
  for (let i = 0; i < transactionCount; i++) {
    const crypto = getRandomCrypto()
    const amount = Math.random() * 5 + 0.01 // 交易数量 0.01-5.01
    const price = Math.random() * 2000 + 100 // 价格 100-2100
    const value = amount * price
    
    transactionTemplates.push({
      crypto,
      amount: parseFloat(amount.toFixed(6)),
      price: parseFloat(price.toFixed(2)),
      value: parseFloat(value.toFixed(2)),
      type: Math.random() > 0.5 ? 'send' : 'receive'
    })
  }
  
  // 计算每笔交易的收益分配
  const totalValue = transactionTemplates.reduce((sum, t) => sum + t.value, 0)
  const targetReturnValue = totalValue * targetReturnAmount
  
  // 为每笔交易分配收益
  let remainingReturn = targetReturnValue
  for (let i = 0; i < transactionTemplates.length; i++) {
    const template = transactionTemplates[i]
    let transactionReturn
    
    if (i === transactionTemplates.length - 1) {
      // 最后一笔交易，确保总收益达到目标
      transactionReturn = remainingReturn
    } else {
      // 根据交易价值按比例分配收益，并添加随机性
      const proportion = template.value / totalValue
      const baseReturn = targetReturnValue * proportion
      const randomFactor = (Math.random() - 0.5) * 0.5 // -25% 到 +25% 的随机变化
      transactionReturn = baseReturn * (1 + randomFactor)
      remainingReturn -= transactionReturn
    }
    
    const returnPercent = (transactionReturn / template.value) * 100
    
    const transaction = {
      id: Date.now() + i + Math.random() * 1000,
      walletId,
      type: template.type,
      amount: template.amount,
      currency: template.crypto.symbol,
      cryptoInfo: template.crypto,
      value: template.value,
      return: parseFloat(transactionReturn.toFixed(6)),
      returnPercent: parseFloat(returnPercent.toFixed(4)),
      hash: generateRandomHash(),
      timestamp: generateRandomTimeInDay(date),
      status: Math.random() > 0.05 ? 'confirmed' : 'pending',
      fee: Math.random() * 0.02 + 0.001
    }
    
    transactions.push(transaction)
    totalReturn += transactionReturn
  }
  
  return transactions
}

// 生成随机哈希
function generateRandomHash() {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

// 生成指定日期内的随机时间
function generateRandomTimeInDay(date) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)
  
  const randomTime = new Date(
    startOfDay.getTime() + Math.random() * (endOfDay.getTime() - startOfDay.getTime())
  )
  
  return randomTime.toISOString()
}

// 生成过去N天的交易记录
export function generateHistoricalTransactions(walletId, days = 7, dailyReturnRange, transactionCountRange) {
  const allTransactions = []
  const today = new Date()
  
  // 限制最多生成7天的数据，避免过多数据
  const maxDays = Math.min(days, 7)
  
  for (let i = 0; i < maxDays; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]
    
    const dailyTransactions = generateDailyTransactions(
      walletId,
      dateString,
      dailyReturnRange,
      transactionCountRange
    )
    
    allTransactions.push(...dailyTransactions)
  }
  
  return allTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

// 计算钱包统计信息
export function calculateWalletStats(transactions) {
  const totalSent = transactions
    .filter(tx => tx.type === 'send')
    .reduce((sum, tx) => sum + tx.value, 0)
    
  const totalReceived = transactions
    .filter(tx => tx.type === 'receive')
    .reduce((sum, tx) => sum + tx.value, 0)
  
  const totalReturn = transactions.reduce((sum, tx) => sum + tx.return, 0)
  const totalReturnPercent = transactions.reduce((sum, tx) => sum + tx.returnPercent, 0)
  
  return {
    totalSent,
    totalReceived,
    netAmount: totalReceived - totalSent,
    totalReturn,
    totalReturnPercent,
    transactionCount: transactions.length,
    profitTransactions: transactions.filter(tx => tx.return > 0).length,
    lossTransactions: transactions.filter(tx => tx.return < 0).length
  }
}
