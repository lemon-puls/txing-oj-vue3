<template>
  <div id="questionMySelfId">
    <div class="left">
      <a-menu
        :style="{ width: '150px', height: '100%', textAlign: 'center' }"
        :default-selected-keys="['submit']"
        show-collapse-button
        @menu-item-click="onClickMenu"
      >
        <a-menu-item style="border-radius: 10px" key="submit" data-obj="1"
          >提交记录
          <template #icon>
            <SvgIcon icon="submit" :size="20" />
          </template>
        </a-menu-item>
        <a-menu-item style="border-radius: 10px" key="favour" data-obj="2"
          >我的收藏
          <template #icon>
            <SvgIcon icon="favour1" :size="20" />
          </template>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right">
      <SubmitRecordView
        v-if="selectedMenuKey === 'submit'"
        style="width: 95%; margin: 0 auto"
        :user-id="Number(userStore.loginUser.id)"
      ></SubmitRecordView>
      <QuestionFavourRecordView v-else-if="selectedMenuKey === 'favour'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionFavourRecordView from "@/components/question/QuestionFavourRecordView.vue";
import SubmitRecordView from "@/components/question/SubmitRecordView.vue";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import SvgIcon from "@/icons/SvgIcon";

const userStore = useUserStore();

const selectedMenuKey = ref("submit");
const onClickMenu = (key: string) => {
  selectedMenuKey.value = key;
};
</script>

<style lang="scss" scoped>
#questionMySelfId {
  //width: 88vw;
  //height: 36vw;
  //max-width: 1250px;
  margin: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  //background-color: white;

  .left {
    //width: 200px;
    //height: 48vh;
    //background-color: #e9d28a;

    .arco-menu-light {
      background-color: rgba(255, 255, 255, 0);
      //opacity: 0.5;
    }

    .menu-item {
      box-sizing: border-box;
      padding: 10px;
      margin: 0 10px;
      border-radius: 5px;
      background-color: whitesmoke;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
