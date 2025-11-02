<template>
  <div class="space-y-3">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="flex items-center justify-between p-3 bg-okx-light-gray rounded-lg"
    >
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-lg"
        >
          <img
            :src="transaction.cryptoInfo?.image"
            alt="crypto logo"
            class="w-6 h-6"
          />
        </div>
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <span class="text-okx-text-secondary text-sm">
              {{ transaction.cryptoInfo?.name || transaction.currency }}
            </span>
          </div>
          <div class="text-okx-text-secondary text-sm">
            {{ formatDate(transaction.timestamp) }}
          </div>
          <div class="text-xs text-okx-text-secondary">
            {{ transaction.hash.slice(0, 8) }}...{{
              transaction.hash.slice(-8)
            }}
          </div>
        </div>
      </div>
      <div class="text-right">
        <div
          class="font-semibold"
          :class="
            transaction.type === 'send' ? 'text-okx-red' : 'text-okx-green'
          "
        >
          {{ transaction.type === "send" ? "-" : "+" }}{{ transaction.amount }}
          {{ transaction.currency }}
        </div>
        <div class="text-okx-text-secondary text-sm">
          ${{ transaction.cryptoInfo.current_price?.toFixed(2) || "0.00" }}
        </div>
        <div
          class="text-xs font-medium"
          :class="transaction.return >= 0 ? 'text-okx-green' : 'text-okx-red'"
        >
          {{ transaction.return >= 0 ? "+" : ""
          }}{{ transaction.returnPercent?.toFixed(2) || "0.00" }}%
        </div>
        <div class="text-xs text-okx-text-secondary">
          {{ transaction.status }}
        </div>
      </div>
    </div>

    <div
      v-if="transactions.length === 0"
      class="text-center py-8 text-okx-text-secondary"
    >
      暂无交易记录
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useTransactionStore } from "../stores/transaction";

const props = defineProps({
  walletId: {
    type: Number,
    required: true,
  },
});

const authStore = useAuthStore();
const transactionStore = useTransactionStore();

const transactions = computed(() => {
  if (authStore.currentUser) {
    return transactionStore.transactions;
  }
  return [];
});

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
