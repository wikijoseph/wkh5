<template>
  <div class="min-h-screen bg-okx-dark">
    <!-- 搜索栏 -->
    <div class="px-4 py-3">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-okx-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜索"
          class="w-full bg-okx-gray border border-okx-light-gray rounded-lg pl-10 pr-4 py-3 text-okx-text placeholder-okx-text-secondary focus:outline-none focus:border-okx-blue"
        />
      </div>
    </div>

    <!-- 钱包概览 -->
    <div class="px-4 py-2">
      <div class="bg-okx-gray rounded-2xl p-6 mb-4">
        <!-- 钱包选择器 -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <div
              class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-bold">🔑</span>
            </div>
            <span class="text-okx-text font-medium"
              >{{
                authStore.currentUser?.displayName ||
                authStore.currentUser?.username
              }}
              - {{ wallets.length }}个钱包</span
            >
            <button
              @click="showAccountManager = true"
              class="text-okx-text-secondary hover:text-okx-text"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="$router.push('/settings')"
              class="text-okx-text-secondary hover:text-okx-text"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
            <button
              @click="logout"
              class="text-okx-text-secondary hover:text-okx-text"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 总资产显示 -->
        <div class="text-center mb-4">
          <div class="text-4xl font-bold text-okx-text mb-2">
            ${{ totalAssetValue.toFixed(2) }}
          </div>
          <div class="flex items-center justify-center space-x-2">
            <span
              class="text-okx-green text-sm font-medium"
              :class="
                totalReturnPercent >= 0 ? 'text-okx-green' : 'text-okx-red'
              "
            >
              {{ totalReturnPercent >= 0 ? "+" : "" }}${{
                totalReturnValue.toFixed(2)
              }}
              ({{ totalReturnPercent >= 0 ? "+" : ""
              }}{{ totalReturnPercent.toFixed(2) }}%)
            </span>
            <span class="text-okx-text-secondary text-sm">1月</span>
          </div>
        </div>

        <!-- 迷你图表 -->
        <div class="flex justify-end mb-4">
          <div class="w-20 h-10 relative">
            <canvas ref="miniChartCanvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- 功能按钮 -->
        <div class="grid grid-cols-4 gap-4">
          <button
            class="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-okx-light-gray transition-colors"
          >
            <div
              class="w-12 h-12 bg-okx-light-gray rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-okx-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
            <span class="text-okx-text text-sm">发送</span>
          </button>
          <button
            class="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-okx-light-gray transition-colors"
          >
            <div
              class="w-12 h-12 bg-okx-light-gray rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-okx-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v14m7-7H5"
                ></path>
              </svg>
            </div>
            <span class="text-okx-text text-sm">接收</span>
          </button>
          <button
            @click="$router.push('/transactions')"
            class="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-okx-light-gray transition-colors"
          >
            <div
              class="w-12 h-12 bg-okx-light-gray rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-okx-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <span class="text-okx-text text-sm">交易历史</span>
          </button>
          <button
            @click="showAddWallet = true"
            class="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-okx-light-gray transition-colors"
          >
            <div
              class="w-12 h-12 bg-okx-light-gray rounded-full flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-okx-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <span class="text-okx-text text-sm">更多</span>
          </button>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="flex space-x-1 mb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          :class="
            activeTab === tab.id
              ? 'bg-okx-text text-okx-dark'
              : 'text-okx-text-secondary hover:text-okx-text'
          "
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 资产列表 -->
      <div class="space-y-3 pb-20">
        <div
          v-for="wallet in wallets"
          :key="wallet.id"
          @click="goToWalletDetail(wallet)"
          class="bg-okx-gray rounded-xl p-4 cursor-pointer hover:bg-okx-light-gray transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              >
                {{ getCryptoLogo(wallet.currency) }}
              </div>
              <div>
                <div class="text-okx-text font-medium">{{ wallet.name }}</div>
                <div class="text-okx-text-secondary text-sm">
                  {{ wallet.currency }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-okx-text font-semibold">
                ${{ (wallet.balance * 2000).toFixed(2) }}
              </div>
              <div class="text-okx-green text-sm flex items-center">
                <svg
                  class="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 14l5-5 5 5z" />
                </svg>
                +12.5%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-okx-gray border-t border-okx-light-gray"
    >
      <div class="grid grid-cols-5 py-2">
        <button class="flex flex-col items-center space-y-1 py-2">
          <svg
            class="w-6 h-6 text-okx-text"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span class="text-xs text-okx-text">首页</span>
        </button>
        <button class="flex flex-col items-center space-y-1 py-2">
          <svg
            class="w-6 h-6 text-okx-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          <span class="text-xs text-okx-text-secondary">行情</span>
        </button>
        <button class="flex flex-col items-center space-y-1 py-2">
          <div
            class="w-12 h-12 bg-okx-green rounded-full flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-okx-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              ></path>
            </svg>
          </div>
          <span class="text-xs text-okx-text">DEX</span>
        </button>
        <button class="flex flex-col items-center space-y-1 py-2">
          <svg
            class="w-6 h-6 text-okx-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          <span class="text-xs text-okx-text-secondary">Boost</span>
        </button>
        <button class="flex flex-col items-center space-y-1 py-2">
          <svg
            class="w-6 h-6 text-okx-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="text-xs text-okx-text-secondary">发现</span>
        </button>
      </div>
    </div>

    <!-- 账户管理模态框 -->
    <div
      v-if="showAccountManager"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-okx-gray rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-okx-text">账户管理</h3>
          <button
            @click="showAccountManager = false"
            class="text-okx-text-secondary hover:text-okx-text"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <WalletAccountManager />
      </div>
    </div>

    <!-- 添加钱包模态框 -->
    <AddWalletModal
      v-if="showAddWallet"
      @close="showAddWallet = false"
      @add="addWallet"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useTransactionStore } from "../stores/transaction";
import { getCryptoBySymbol } from "../data/cryptoData.js";
import { Chart, registerables } from "chart.js";
import AddWalletModal from "../components/AddWalletModal.vue";
import WalletAccountManager from "../components/WalletAccountManager.vue";

Chart.register(...registerables);

const router = useRouter();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();
const showAddWallet = ref(false);
const showAccountManager = ref(false);
const activeTab = ref("币种");
const miniChartCanvas = ref(null);
let miniChart = null;

const tabs = [
  { id: "币种", name: "币种" },
  { id: "DeFi", name: "DeFi" },
  { id: "NFT", name: "NFT" },
  { id: "授权", name: "授权" },
];

const wallets = computed(() => authStore.currentUser?.wallets || []);
const totalBalance = computed(() => {
  return wallets.value.reduce((total, wallet) => total + wallet.balance, 0);
});

// 计算总资产价值
const totalAssetValue = computed(() => {
  if (!authStore.currentUser) return 0;

  const baseValue = totalBalance.value * 2000;
  const allTransactions = transactionStore.getUserTransactions(
    authStore.currentUser.username
  );
  const totalReturn = allTransactions.reduce(
    (sum, tx) => sum + (tx.return || 0),
    0
  );

  return baseValue + totalReturn;
});

// 计算总收益
const totalReturnValue = computed(() => {
  if (!authStore.currentUser) return 0;

  const allTransactions = transactionStore.getUserTransactions(
    authStore.currentUser.username
  );
  return allTransactions.reduce((sum, tx) => sum + (tx.return || 0), 0);
});

// 计算总收益率
const totalReturnPercent = computed(() => {
  if (!authStore.currentUser) return 0;

  const baseValue = totalBalance.value * 2000;
  if (baseValue === 0) return 0;

  return (totalReturnValue.value / baseValue) * 100;
});

const getCryptoLogo = (symbol) => {
  const crypto = getCryptoBySymbol(symbol);
  return crypto?.logo || "💰";
};

// 创建迷你图表
const createMiniChart = () => {
  if (!miniChartCanvas.value) return;

  // 销毁现有图表
  if (miniChart) {
    miniChart.destroy();
  }

  const ctx = miniChartCanvas.value.getContext("2d");

  // 获取最近7天的资金数据
  const chartData = generateMiniChartData();

  miniChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          data: chartData.values,
          borderColor: "#02C076",
          backgroundColor: "rgba(2, 192, 118, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
      },
    },
  });
};

// 生成迷你图表数据
const generateMiniChartData = () => {
  if (!authStore.currentUser) {
    return { labels: [], values: [] };
  }

  const allTransactions = transactionStore.getUserTransactions(
    authStore.currentUser.username
  );

  // 按日期分组计算每日总价值
  const dailyData = {};
  const today = new Date();

  // 初始化最近7天的数据
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];
    dailyData[dateString] = { value: 0, return: 0 };
  }

  // 计算每日的收益
  allTransactions.forEach((tx) => {
    const date = new Date(tx.timestamp).toISOString().split("T")[0];
    if (dailyData[date]) {
      dailyData[date].return += tx.return || 0;
    }
  });

  // 计算累计价值曲线
  const baseValue = totalBalance.value * 2000; // 基础价值
  const labels = [];
  const values = [];
  let cumulativeValue = baseValue;

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    if (dailyData[dateString]) {
      cumulativeValue += dailyData[dateString].return;
    }

    labels.push("");
    values.push(cumulativeValue);
  }

  return { labels, values };
};

const goToWalletDetail = (wallet) => {
  router.push(`/wallet/${wallet.id}`);
};

const addWallet = (walletData) => {
  authStore.addUserWallet(walletData);
  showAddWallet.value = false;
};

const logout = () => {
  authStore.logout();
  router.push("/");
};

// 每天生成新的交易记录
onMounted(async () => {
  if (authStore.currentUser) {
    const lastGenerated = localStorage.getItem(
      `lastGenerated_${authStore.currentUser.username}`
    );
    const today = new Date().toISOString().split("T")[0];

    if (lastGenerated !== today) {
      transactionStore.generateDailyTransactions(
        authStore.currentUser.username,
        authStore.currentUser.wallets,
        authStore.currentUser.dailyReturnRange,
        authStore.currentUser.transactionCountRange
      );
      localStorage.setItem(
        `lastGenerated_${authStore.currentUser.username}`,
        today
      );
    }

    // 等待DOM更新后创建迷你图表
    await nextTick();
    createMiniChart();
  }
});

// 监听交易数据变化，更新迷你图表
watch(
  () =>
    transactionStore.getUserTransactions(authStore.currentUser?.username || ""),
  () => {
    if (authStore.currentUser) {
      nextTick(() => {
        createMiniChart();
      });
    }
  },
  { deep: true }
);
</script>
