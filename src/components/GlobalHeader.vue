<template>
  <a-row
    id="globalHeader"
    align="center"
    class="grid-demo"
    style="margin-bottom: 10px"
    :wrap="false"
  >
    <a-col flex="100px">
      <div class="title-bar">
        <img class="logo" src="../assets/txing-oj.png" />
        <!--          <div class="title">Txing OJ</div>-->
      </div>
    </a-col>
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/router";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
// 默认主页
const selectedKeys = ref(["/"]);
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 路由跳转后 更新选中的菜单
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const store = useStore();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "lemon",
    role: "canAdmin",
  });
}, 3000);

const visibleRoutes = routes.filter((item, index) => {
  if (item.meta?.hideInMenu) {
    return false;
  }
  return true;
});
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

/*.title {*/
/*  color: #444;*/
/*  margin-left: 16px;*/
/*  font-size: 16px;*/
/*}*/
</style>
