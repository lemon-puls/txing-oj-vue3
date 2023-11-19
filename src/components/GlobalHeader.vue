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
        <a-menu-item
          v-for="item in visibleRoutes"
          :key="item.path"
          style="font-size: 20px"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="200px" style="text-align: right">
      <div style="font-size: 20px">
        <a-popover>
          <a-avatar>
            <img
              alt="avatar"
              :src="store.state.user?.loginUser?.userAvatar ?? ''"
            />
          </a-avatar>
          <template #content>
            <a-space class="wrapper" direction="vertical">
              <a-button
                v-if="
                  store.state.user.loginUser.userRole != AccessEnum.NOT_LOGIN
                "
                type="primary"
                long
                @click="handleLogout"
                >退出登录
              </a-button>
              <a-button
                v-else
                type="primary"
                long
                @click="router.push({ path: '/user/login' })"
                >立即登录
              </a-button>
            </a-space>
          </template>
        </a-popover>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/router";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "../access/checkAccess";
import AccessEnum from "../access/accessEnum";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

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
// 进入个人主页
const toMyselfPage = () => {
  router.push({
    path: "/myself",
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

/**
 * 退出登录
 */
const handleLogout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code != 0) {
    message.error(res.msg);
  }
  // 更新本地登录用户数据
  store.dispatch("user/getLoginUser", {});
  // 重定向到登录页
  router.push({
    path: "/user/login",
  });
};
</script>

<style>
.title-bar {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

#modifyInfoModal {
  /*text-align: center;*/
  /*position: relative;*/
  /*margin: 0 auto;*/
}

.arco-form {
  margin: 0 auto;
}

/*.title {*/
/*  color: #444;*/
/*  margin-left: 16px;*/
/*  font-size: 16px;*/
/*}*/
</style>
