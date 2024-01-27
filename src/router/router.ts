import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegistView from "@/views/user/UserRegistView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import MyselfView from "@/views/MyselfView.vue";
import AddPostView from "@/views/post/AddPostView.vue";
import ViewPostView from "@/views/post/ViewPostView.vue";
import PostSearchView from "@/views/post/PostSearchView.vue";
import VirtualListTest from "@/views/test/VirtualListTest.vue";
import InfiniteScrollTest from "@/components/test/InfiniteScrollTest.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/txing/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/txing/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/txing/user/regist",
        name: "用户注册",
        component: UserRegistView,
      },
    ],
  },
  // {
  //   path: "/",
  //   name: "主页",
  //   component: QuestionsView,
  // },
  // {
  //   path: "/txing",
  //   name: "题库中心",
  //   component: QuestionsView,
  // },
  {
    path: "/txing",
    name: "题库中心",
    component: QuestionsView,
    // meta: {
    //   hideInMenu: true,
    // },
  },
  // {
  //   path: "/",
  //   name: "题库中心",
  //   component: QuestionsView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/txing/post/search",
    name: "技术文章",
    component: PostSearchView,
  },
  {
    path: "/txing/view/question/:id",
    name: "做题",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/txing/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/txing/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/txing/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/txing/noAuth",
    name: "权限不足",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  {
    path: "/txing/myself",
    name: "我的主页",
    component: MyselfView,
    meta: {
      // hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/txing/post/add",
    name: "写文章",
    component: AddPostView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/post/update",
    name: "更新文章",
    component: AddPostView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/post/view/:id",
    name: "看文章",
    props: true,
    component: ViewPostView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/virtualList/test",
    name: "虚拟列表",
    component: InfiniteScrollTest,
  },
];
