import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { routes } from "@/router/router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
