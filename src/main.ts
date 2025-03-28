import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import "@/plugins/axios";
import "@/access";
import "bytemd/dist/index.css";
import JsonViewer from "vue3-json-viewer";
import "vue-json-viewer/style.css";
import "animate.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import ElementPlus from "element-plus"; //全局引入
import "element-plus/dist/index.css";
import "@/style/main.css";
// import "@/utils/websocket";
import InfiniteScroll from "vue-infinite-scroll";

import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";

const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
const req = require.context("@/icons/svg", false, /\.svg$/);
requireAll(req);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 数据持久化
createApp(App)
  .use(pinia)
  .use(ArcoVue)
  .use(JsonViewer)
  .use(router)
  .use(InfiniteScroll)
  // .use(ElementPlus)
  .mount("#app");
