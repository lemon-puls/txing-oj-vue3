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
import ManageView from "@/views/manage/ManageView.vue";
import WeekMatchView from "@/views/competition/WeekMatchView/WeekMatchView.vue";
import DoWeekMatchView from "@/views/competition/DoWeekMatchView/DoWeekMatchView.vue";
import OnlinePkMatchView from "@/views/competition/OnlinePkMatchView/OnlinePkMatchView.vue";
import SubmitSuccessView from "@/views/competition/SubmitSuccessView.vue";
import VideoTest from "@/views/course/VideoTest.vue";
import CourseSearchView from "@/views/course/CourseSearchView/index.vue";
import CourseVideoPlayView from "@/views/course/CourseVideoPlayView/index.vue";
import CoursePublishView from "@/views/course/CoursePublishView/index.vue";
import FindOpponentView from "@/views/competition/OnlinePkMatchView/FindOpponentView/index.vue";
import PkResultView from "@/views/competition/OnlinePkMatchView/PkResultView/index.vue";
import ForumPostPublish from "@/views/forum/ForumPostPublish.vue";
import ForumSearchView from "@/views/forum/ForumSearchView.vue";
import SimulateResultView from "@/views/competition/WeekMatchView/SimulateResultView/index.vue";

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
    meta: {
      icon: "question1",
    },
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
    meta: {
      icon: "article1",
    },
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
  // {
  //   path: "/txing/virtualList/test",
  //   name: "虚拟列表",
  //   component: VirtualListTest,
  // },
  {
    path: "/txing/match/center",
    name: "比赛中心",
    component: WeekMatchView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/week/do",
    name: "进行周赛",
    component: DoWeekMatchView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/week/simulate/:matchId",
    name: "周赛模拟",
    component: DoWeekMatchView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/pk/:id",
    name: "在线pk",
    component: OnlinePkMatchView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/pk/matching",
    name: "在线pk匹配对手中",
    component: FindOpponentView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/txing/manage",
  //   name: "后台管理",
  //   component: ManageView,
  // },
  {
    path: "/txing/match/submit/success",
    name: "交卷成功",
    component: SubmitSuccessView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/simulate/result/:joinId",
    name: "模拟周赛结果页",
    component: SimulateResultView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/txing/course/video/play/test",
  //   name: "视频播放",
  //   component: VideoTest,
  // },
  {
    path: "/txing/course/search",
    name: "在线课程",
    component: CourseSearchView,
    meta: {
      icon: "video",
    },
  },
  {
    path: "/txing/forum/search",
    name: "论坛中心",
    component: ForumSearchView,
    meta: {
      icon: "forum1",
    },
  },
  {
    path: "/txing/course/video/play/:courseId",
    name: "课程播放页",
    props: true,
    component: CourseVideoPlayView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/course/publish",
    name: "发布课程",
    component: CoursePublishView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/course/update",
    name: "更新课程",
    component: CoursePublishView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/match/pk/result/:matchId",
    name: "PK结果",
    props: true,
    component: PkResultView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/myself",
    name: "我的主页",
    component: MyselfView,
    meta: {
      // hideInMenu: true,
      access: ACCESS_ENUM.USER,
      icon: "myself",
    },
  },
  {
    path: "/txing/forum/post/publish",
    name: "论坛帖子发布",
    component: ForumPostPublish,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/txing/forum/post/update/:topicId",
    name: "论坛帖子修改",
    component: ForumPostPublish,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
];
