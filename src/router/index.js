import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import WalletDetail from "../views/WalletDetail.vue";
import Settings from "../views/Settings.vue";
import Demo from "../views/Demo.vue";
import Transactions from "../views/Transactions.vue";

const routes = [
  {
    path: "/",
    redirect: "/login", // 默认跳转到登录页
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/wallet/:id",
    name: "WalletDetail",
    component: WalletDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory("/wkh5/"), // ✅ GitHub Pages 仓库路径
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && authStore.isLoggedIn) {
    next("/home");
  } else {
    next();
  }
});

export default router;
