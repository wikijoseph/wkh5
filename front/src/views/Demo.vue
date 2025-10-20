<template>
  <div class="min-h-screen bg-okx-dark p-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-okx-text mb-8 text-center">H5钱包功能演示</h1>
      
      <!-- 功能特性展示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-okx-text mb-4">🔐 多账户管理</h3>
          <ul class="space-y-2 text-okx-text-secondary">
            <li>• 支持多个私钥钱包账户</li>
            <li>• 每个账户独立的交易记录</li>
            <li>• 用户数据完全隔离</li>
            <li>• 可自定义日收益范围</li>
          </ul>
        </div>
        
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-okx-text mb-4">📊 智能交易生成</h3>
          <ul class="space-y-2 text-okx-text-secondary">
            <li>• 每日自动生成随机交易记录</li>
            <li>• 确保盈亏平衡，有赚有亏</li>
            <li>• 可配置交易数量范围</li>
            <li>• 支持前50币种交易</li>
          </ul>
        </div>
        
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-okx-text mb-4">💰 币种支持</h3>
          <ul class="space-y-2 text-okx-text-secondary">
            <li>• 支持前50主流币种</li>
            <li>• 每个币种都有专属logo</li>
            <li>• 实时价格显示</li>
            <li>• 盈亏统计图表</li>
          </ul>
        </div>
        
        <div class="card p-6">
          <h3 class="text-xl font-semibold text-okx-text mb-4">📱 界面设计</h3>
          <ul class="space-y-2 text-okx-text-secondary">
            <li>• OKX风格黑色系主题</li>
            <li>• 响应式H5设计</li>
            <li>• 现代化UI组件</li>
            <li>• 流畅的动画效果</li>
          </ul>
        </div>
      </div>

      <!-- 测试账户信息 -->
      <div class="card p-6 mb-8">
        <h3 class="text-xl font-semibold text-okx-text mb-4">🧪 测试账户</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-okx-light-gray rounded-lg p-4">
            <h4 class="text-okx-text font-medium mb-2">管理员账户</h4>
            <p class="text-okx-text-secondary text-sm mb-2">用户名: admin</p>
            <p class="text-okx-text-secondary text-sm mb-2">密码: 123456</p>
            <p class="text-okx-text-secondary text-sm mb-2">日收益: 0.05% - 0.07%</p>
            <p class="text-okx-text-secondary text-sm">交易数: 50-100条/天</p>
          </div>
          <div class="bg-okx-light-gray rounded-lg p-4">
            <h4 class="text-okx-text font-medium mb-2">普通用户</h4>
            <p class="text-okx-text-secondary text-sm mb-2">用户名: user1</p>
            <p class="text-okx-text-secondary text-sm mb-2">密码: password</p>
            <p class="text-okx-text-secondary text-sm mb-2">日收益: 0.03% - 0.05%</p>
            <p class="text-okx-text-secondary text-sm">交易数: 30-80条/天</p>
          </div>
        </div>
      </div>

      <!-- 币种展示 -->
      <div class="card p-6 mb-8">
        <h3 class="text-xl font-semibold text-okx-text mb-4">🪙 支持的币种</h3>
        <div class="grid grid-cols-5 md:grid-cols-10 gap-4">
          <div
            v-for="crypto in cryptoCurrencies.slice(0, 20)"
            :key="crypto.symbol"
            class="text-center"
          >
            <div class="text-2xl mb-1">{{ crypto.logo }}</div>
            <div class="text-xs text-okx-text-secondary">{{ crypto.symbol }}</div>
          </div>
        </div>
        <p class="text-okx-text-secondary text-sm mt-4 text-center">
          共支持 {{ cryptoCurrencies.length }} 种主流币种
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="text-center">
        <button
          @click="$router.push('/login')"
          class="btn-primary text-lg px-8 py-3 mr-4"
        >
          开始体验
        </button>
        <button
          @click="$router.push('/')"
          class="bg-okx-light-gray text-okx-text hover:bg-gray-600 text-lg px-8 py-3 rounded-lg transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cryptoCurrencies } from '../data/cryptoData.js'
</script>
