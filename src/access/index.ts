import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import message from "@arco-design/web-vue/es/message";

router.beforeEach(async (to, from, next) => {
  // console.log("登录用户信息：", store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;
  // 没登录就自动登录
  if (!loginUser || !loginUser.userRole) {
    // await可以使得用户登录成功之后 再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 要跳转的页面必须要登录
    // console.log("loginUser", store.state.user.loginUser);
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      message.info("请先登录！");
      return;
    }
    // 已经登录 但是没有对应权限
    if (!checkAccess(loginUser, needAccess)) {
      message.info("权限不足");
      next("/noAuth");
      return;
    }
  }
  next();
});
