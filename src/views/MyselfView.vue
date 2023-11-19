<template>
  <div id="myselfView">
    <!--    <img src="../assets/gy.png" style="width: 100%; height: auto" />-->
    <!--    <a-avatar id="headImg" :size="256">-->
    <!--      <img-->
    <!--        alt="avatar"-->
    <!--        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"-->
    <!--      />-->
    <!--    </a-avatar>-->

    <a-upload
      action="http://localhost:8121/api/file/upload"
      :data="appendData"
      :file-list="fileList"
      :show-file-list="false"
      :with-credentials="true"
      @change="handleChange1"
    >
      <template #upload-button>
        <a-avatar
          id="headImg"
          :size="256"
          :trigger-icon-style="{ color: '#3491FA' }"
          :auto-fix-font-size="false"
          :style="{ backgroundColor: '#168CFF' }"
        >
          <img alt="avatar" :src="totalData.userAvatar" />
        </a-avatar>
      </template>
    </a-upload>

    <div id="backgorupDiv">
      <div id="basicInfo">
        <div id="updateInfoIcon">
          <a-popover>
            <div id="updateInfoIconSub">
              <icon-settings :size="25" />
              <span>设置</span>
            </div>
            <template #content>
              <a-space class="wrapper" direction="vertical">
                <!--              <a-button type="primary" long @click="toMyselfPage"-->
                <!--                >个人主页-->
                <!--              </a-button>-->
                <a-button type="primary" long>修改密码</a-button>
                <a-button type="primary" long @click="handleClick"
                  >修改信息
                </a-button>
              </a-space>
            </template>
          </a-popover>
        </div>
        <a-space direction="vertical" size="large" fill>
          <a-descriptions size="large" :column="3">
            <a-descriptions-item
              :key="item"
              v-for="item of data"
              :label="item.label"
              :span="item.span ?? 1"
            >
              <a-tag>{{ item.value }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-space>
        <p style="font-size: 20px">个性签名：{{ form.personSign }}</p>
      </div>
      <div style="padding-top: 100px">
        <a-tabs size="large">
          <a-tab-pane key="1">
            <template #title>
              <icon-pen-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >提交记录</span
              >
            </template>
            <!--            <a-table-->
            <!--              id="submitRecordTable"-->
            <!--              style="width: 90%; margin: 0 auto"-->
            <!--              :bordered="false"-->
            <!--              :show-header="false"-->
            <!--              :columns="recordColumns"-->
            <!--              :data="records"-->
            <!--            />-->
            <SubmitRecordView
              :scroll-x="700"
              :scroll-y="370"
              style="min-width: 100%; margin: auto"
            ></SubmitRecordView>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #title>
              <icon-star-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >我的收藏</span
              >
            </template>
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="3">
            <template #title>
              <icon-heart-fill size="28" />
              <span
                style="font-size: 25px; font-weight: bold; margin-left: 10px"
                >我的粉丝</span
              >
            </template>
            Content of Tab Panel 3
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>

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
            v-model="form.userName"
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
            v-model="form.personSign"
            placeholder="请输入您的个性签名..."
            :max-length="{ length: 100, errorOnly: true }"
            allow-clear
            show-word-limit
          />
        </a-form-item>

        <a-form-item>
          <!--          <a-button html-type="submit">Submit</a-button>-->
          <a-button html-type="submit" type="primary" shape="round"
            >确认
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {
  IconHeartFill,
  IconPenFill,
  IconStarFill,
  IconSettings,
} from "@arco-design/web-vue/es/icon";
import {
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";
import { FileItem } from "@arco-design/web-vue";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import store from "@/store";
import SubmitRecordView from "@/components/question/SubmitRecordView.vue";
import * as monaco from "monaco-editor";
import AccessEnum from "@/access/accessEnum";

/**
 * 初始化工作
 */
onBeforeMount(() => {
  loadUserPersonInfo();
});
onMounted(() => {
  totalData.value.userAvatar = store.state.user.loginUser.userAvatar;
});

/**
 * 修改个人信息
 */
const visible = ref(false);
// 修改个人信息
const handleClick = async () => {
  // alert("获取成功" + form.value.userName);
  visible.value = true;
};
// 加载个人原信息
const loadUserPersonInfo = async () => {
  // 加载个人原信息
  const res = await UserControllerService.getCurrentUserVoByIdUsingGet();
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  Object.assign(form.value, res.data);
  data[0].value = form.value.userName;
  data[1].value = form.value.school;
  data[2].value = form.value.profession;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
// 修改个人信息表单数据
const form = ref({
  userName: "",
  school: "",
  profession: "",
  personSign: "",
});
const handleSubmit = async (data: any) => {
  // console.log(data);
  updatePersonIfo();
  // 更新用户数据
  store.dispatch("user/getLoginUser", {
    userName: "lemon",
    userRole: AccessEnum.ADMIN,
  });
  visible.value = false;
};
// 更新个人信息
const updatePersonIfo = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(form.value);
  if (res.code != 0) {
    message.error(res.msg);
  } else {
    message.success("更新成功");
  }
  data[0].value = form.value.userName;
  data[1].value = form.value.school;
  data[2].value = form.value.profession;
};

// watch(
//   () => store.state.user.loginUser,
//   () => {
//     data[1].value = store.state.user.loginUser.school;
//   }
// );

/**
 * 数据中心
 */
const totalData = ref({
  userAvatar:
    "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
});

/**
 * 头像相关
 */
const appendData = {
  biz: "user_avatar",
};
const fileList: any[] = [];
const handleChange1 = async (info: any) => {
  // console.log("first:", fileList[0]);
  // console.log(toRaw(toRaw(info)[0]).response);
  if (info.length == 2) {
    info.splice(0, 1);
    // console.log("删除成功：", info.length);
  }
  const response = toRaw(toRaw(info)[0]).response;
  if (response != undefined && response.data != totalData.value.userAvatar) {
    // 更新数据库
    const res = await UserControllerService.updateMyUserUsingPost({
      userAvatar: response.data,
    });
    if (res.code != 0) {
      message.error("更换头像出错 请稍后重试！");
      return;
    }
    store.state.user.loginUser.userAvatar = response.data;
    totalData.value.userAvatar = response.data;
    message.success("头像更换成功");
  }
};

const recordColumns = [
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const records = reactive([
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
]);

const data = reactive([
  {
    label: "昵称",
    value: form.value.userName,
  },
  {
    label: "大学",
    value: form.value.school,
  },
  {
    label: "专业",
    value: form.value.profession,
  },
  {
    label: "刷题数",
    value: store.state.user.loginUser.questionCount,
  },
  {
    label: "通过率",
    value: store.state.user.loginUser.acceptedRate,
  },
]);

const images = [
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
];
const handleChange = (value: string) => {
  console.log(value);
};
</script>

<style>
#myselfView {
  max-width: 1280px;
  margin: 0 auto;
  /*padding-top: 200px;*/
  /*background: rgba(255, 255, 255, 0.8);*/
  /*padding-left: 100px;*/
  /*padding-top: 100px;*/
}

#headImg {
  margin-left: 80px;
  /*position: absolute;*/
}

#backgorupDiv {
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  min-height: 800px;
  margin-top: -128px;
  /*margin-top: 200px;*/
  border-radius: 20px 20px;
}

#basicInfo {
  padding-top: 15px;
  margin-left: 400px;
}

td.arco-descriptions-item-label.arco-descriptions-item-label-block {
  font-size: 18px !important;
  font-weight: bold !important;
  color: #007bff !important;
}

.arco-tag-size-medium {
  font-size: 18px !important;
}

#submitRecordTable .arco-table-td {
  background: rgba(255, 255, 255, 0);
}

#updateInfoIcon {
  margin-bottom: 10px;
  text-align: right;
  margin-right: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
}

#updateInfoIconSub {
  display: flex;
  align-items: center;
}
</style>
