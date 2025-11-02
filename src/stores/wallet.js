import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    wallets: [
      {
        id: 1,
        name: "主钱包",
        address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        balance: 2.4567,
        createdAt: "2024-01-15",
      },
    ],
    currentWallet: null,
  }),

  getters: {
    totalBalance: (state) => {
      return state.wallets.reduce((total, wallet) => total + wallet.balance, 0);
    },
    getWalletById: (state) => {
      return (id) => state.wallets.find((wallet) => wallet.id === id);
    },
  },

  actions: {
    addWallet(wallet) {
      const newWallet = {
        ...wallet,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      this.wallets.push(newWallet);
    },

    deleteWallet(id) {
      const index = this.wallets.findIndex((wallet) => wallet.id === id);
      if (index > -1) {
        this.wallets.splice(index, 1);
      }
    },

    setCurrentWallet(wallet) {
      this.currentWallet = wallet;
    },
  },
});
