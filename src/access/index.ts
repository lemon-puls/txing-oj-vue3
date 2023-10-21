import router from "@/router";
import store from "@/store";

router.beforeEach((to, from, next) => {
  console.log("查看用户信息：", store.state.user.loginUser);
  // 跳转前判断一下当前用户是否有对应权限
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
