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
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
          <template #content>
            <a-space class="wrapper" direction="vertical">
              <a-button type="primary" long @click="toMyselfPage"
                >个人主页
              </a-button>
              <a-button type="primary" long>修改密码</a-button>
              <a-button type="primary" long @click="handleClick"
                >修改信息
              </a-button>
              <a-button type="primary" long>退出登录</a-button>
            </a-space>
          </template>
        </a-popover>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>

  <a-modal
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    width="800px"
    :footer="false"
  >
    <template #title> 修改个人信息</template>
    <div id="modifyInfoModal">
      <a-form
        :model="form"
        id="modifyInfoForm"
        :style="{ width: '600px' }"
        @submit="handleSubmit"
      >
        <a-form-item field="nickName" tooltip="不超过10个字符" label="昵称">
          <a-input
            v-model="form.name"
            style="max-width: 400px"
            placeholder="请输入昵称..."
          />
        </a-form-item>
        <a-form-item field="school" label="大学">
          <a-input
            style="max-width: 400px"
            v-model="form.school"
            placeholder="请输入您的大学..."
          />
        </a-form-item>
        <a-form-item field="profession" label="专业">
          <a-input
            style="max-width: 400px"
            v-model="form.profession"
            placeholder="请输入您的专业..."
          />
        </a-form-item>
        <a-form-item field="signature" label="个性签名">
          <a-textarea
            style="max-width: 400px"
            v-model="form.signature"
            placeholder="请输入您的个性签名..."
            :max-length="{ length: 100, errorOnly: true }"
            allow-clear
            show-word-limit
          />
        </a-form-item>

        <a-form-item>
          <!--          <a-button html-type="submit">Submit</a-button>-->
          <a-button html-type="submit" type="primary" shape="round"
            >确认</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { routes } from "../router/router";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
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
// 进入个人主页
const toMyselfPage = () => {
  router.push({
    path: "/myself",
  });
};

// 修改个人信息表单数据
const form = reactive({
  name: "",
  post: "",
});
const handleSubmit = (data: any) => {
  // console.log(data);
  alert(data);
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

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
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
