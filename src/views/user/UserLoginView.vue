<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">Txing 与你同行</h2>
    <a-form
      style="max-width: 400px; margin: 50px auto; max-height: 150px"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-space direction="vertical" size="medium">
        <a-form-item field="userAccount" tooltip="请输入账号..." label="账号">
          <a-input v-model="form.userAccount" placeholder="请输入账号..." />
        </a-form-item>
        <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码..."
          />
        </a-form-item>
        <a-form-item id="loginDoId">
          <a-button
            id="loginButtonId"
            type="primary"
            html-type="submit"
            style="width: 120px"
            >登录
          </a-button>
        </a-form-item>
      </a-space>
    </a-form>
    <div id="registerButtonId">
      <span style="color: #095770" @click="clickRegist"
        >还没有账号？立即去注册！</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/**
 * 前往注册页
 */
const clickRegist = () => {
  router.push({ path: "/txing/user/regist" });
};

/**
 * 登录表单信息
 */
const form = reactive({
  userAccount: "lemon",
  userPassword: "12345678",
} as UserLoginRequest);
/**
 * 表单提交后 处理函数
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    // 等获取登录信息成功后 再跳转到主页
    await store.dispatch("user/getLoginUser");
    // alert("恭喜你！登录成功" + JSON.stringify(res.data));
    router.push({
      path: "/txing",
      replace: true,
    });
  } else {
    message.error("登录失败:" + res.msg);
  }
};
</script>

<style>
#userLoginView {
  background: rgba(255, 255, 255, 0.5);
  width: 480px;
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 10px;
  border-radius: 20px;
  height: 320px;
}

#loginDoId {
  justify-content: space-between;
}

#loginButtonId {
  margin-left: auto;
  margin-right: auto;
}

#registerButtonId {
  /*justify-content: right;*/
  text-align: right;
  margin-right: 30px;
}
</style>
