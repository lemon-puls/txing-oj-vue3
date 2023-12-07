<template>
  <div id="userRegistView">
    <h2 style="margin-bottom: 16px; text-align: center">Txing 与你同行</h2>
    <div style="margin-bottom: 16px; text-align: center">
      快来加入
      <span style="color: #ff7300; font-size: 20px">Txing</span> 大家庭啦！
    </div>
    <a-form
      style="max-width: 400px; margin: 50px auto; max-height: 220px"
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
        <a-form-item
          field="checkPassword"
          tooltip="密码不少于8位"
          label="确认密码"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次确认密码..."
          />
        </a-form-item>
        <a-form-item id="loginDoId">
          <a-button
            id="loginButtonId"
            type="primary"
            html-type="submit"
            style="width: 120px"
            >GO
          </a-button>
        </a-form-item>
      </a-space>
    </a-form>
    <div id="registerButtonId">
      <span style="color: #095770" @click="clickLogin"
        >已有账号？立即去登录！</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/**
 * 前往登录页
 */
const clickLogin = () => {
  router.push({ path: "/txing/user/login" });
};

/**
 * 登录表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
/**
 * 表单提交后 处理函数
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功 请登录！");
    router.push({
      path: "/txing/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败:" + res.msg);
  }
};
</script>

<style>
#userRegistView {
  background: rgba(255, 255, 255, 0.5);
  width: 480px;
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 10px;
  border-radius: 20px;
  height: 420px;
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
  margin-right: 20px;
}
</style>
