import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { UserControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export const useUserStore = defineStore("user", () => {
  const loginUser = ref({
    userName: "未登录",
    userAvatar:
      "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
    userRole: ACCESS_ENUM.NOT_LOGIN,
    token: "",
    id: -1,
  });
  const isSign = computed({
    get: () => {
      return loginUser.value.id !== -1;
    },
    set: (val) => {
      if (!val) {
        loginUser.value.id = -1;
      }
    },
  });

  const getLoginUser = async () => {
    // 请求后端 获取登录信息
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      updateUser(res.data);
    } else {
      updateUser({ ...loginUser.value, userRole: ACCESS_ENUM.NOT_LOGIN });
    }
  };

  const updateUser = (payload: any) => {
    loginUser.value = payload;
  };

  return { loginUser, getLoginUser, updateUser, isSign };
});
