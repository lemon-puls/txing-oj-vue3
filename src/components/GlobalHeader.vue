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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "../access/checkAccess";
import AccessEnum from "../access/accessEnum";

const router = useRouter();
const store = useStore();
const loginUser = store.state.user.loginUser;
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

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "lemon",
    userRole: AccessEnum.ADMIN,
  });
  console.log(store.state.user.loginUser);
}, 3000);

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据用户是否具有权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
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
