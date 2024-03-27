<template>
  <div id="matchMyselfId">
    <div class="left">
      <a-menu
        :style="{ width: '150px', height: '100%', textAlign: 'center' }"
        :default-selected-keys="['works']"
        show-collapse-button
        @menu-item-click="onClickMenu"
      >
        <a-menu-item style="border-radius: 10px" key="works" data-obj="1"
          >我的视频
          <template #icon>
            <SvgIcon icon="video" :size="20" />
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
      <!--      <SubmitRecordView-->
      <!--        v-if="selectedMenuKey === 'weekRecord'"-->
      <!--        style="width: 90%; margin: 0 auto"-->
      <!--        :user-id="Number(userStore.loginUser.id)"-->
      <!--      ></SubmitRecordView>-->
      <!--      <QuestionFavourRecordView v-else-if="selectedMenuKey === 'favour'" />-->
      <CourseWorks />
      <!--      <a-empty />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionFavourRecordView from "@/components/question/QuestionFavourRecordView.vue";
import SubmitRecordView from "@/components/question/SubmitRecordView.vue";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import CourseWorks from "@/components/course/CourseWorks.vue";
import SvgIcon from "@/icons/SvgIcon";

const userStore = useUserStore();

const selectedMenuKey = ref("works");
const onClickMenu = (key: string) => {
  selectedMenuKey.value = key;
};
</script>

<style lang="scss">
#matchMyselfId {
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

.arco-menu-vertical .arco-menu-item.arco-menu-has-icon .arco-menu-icon,
.arco-menu-vertical .arco-menu-group-title.arco-menu-has-icon .arco-menu-icon,
.arco-menu-vertical .arco-menu-pop-header.arco-menu-has-icon .arco-menu-icon,
.arco-menu-vertical
  .arco-menu-inline-header.arco-menu-has-icon
  .arco-menu-icon {
  margin: 0;
}
</style>
