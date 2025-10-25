<template>
    <div class="h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAuthStore } from '../stores/auth'
import { useTransactionStore } from '../stores/transaction'

Chart.register(...registerables)

const props = defineProps({
  walletId: {
    type: Number,
    required: true
  }
})

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const chartCanvas = ref(null)
let chart = null

const generateChartData = () => {
  if (!authStore.currentUser) return { labels: [], datasets: [] }
  
  const transactions = transactionStore.getTransactionsByWalletId(authStore.currentUser.username, props.walletId)
  
  // 按日期分组计算每日盈亏
  const dailyData = {}
  transactions.forEach(tx => {
    const date = new Date(tx.timestamp).toISOString().split('T')[0]
    if (!dailyData[date]) {
      dailyData[date] = 0
    }
    dailyData[date] += tx.return || 0
  })
  
  // 获取最近7天的数据
  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]
    last7Days.push({
      date: dateString,
      value: dailyData[dateString] || 0
    })
  }
  
  const labels = last7Days.map(d => {
    const date = new Date(d.date)
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  })
  
  const data = last7Days.map(d => d.value)
  
  return {
    labels,
    datasets: [{
      label: '盈亏 (USD)',
      data: data,
      borderColor: '#02C076',
      backgroundColor: 'rgba(2, 192, 118, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  }
}

const createChart = () => {
  if (chart) {
    chart.destroy()
  }
  
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: generateChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#F0F0F0'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#848E9C'
          },
          grid: {
            color: '#2B3139'
          }
        },
        y: {
          ticks: {
            color: '#848E9C'
          },
          grid: {
            color: '#2B3139'
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.walletId, () => {
  createChart()
})
</script>