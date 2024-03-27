<template>
  <div id="matchMyselfId">
    <div class="left">
      <a-menu
        :style="{ width: '150px', height: '100%', textAlign: 'center' }"
        :default-selected-keys="['weekRecord']"
        show-collapse-button
        @menu-item-click="onClickMenu"
      >
        <a-menu-item style="border-radius: 10px" key="weekRecord" data-obj="1"
          >周赛记录
          <template #icon>
            <SvgIcon icon="weekmatch" :size="20" />
          </template>
        </a-menu-item>
        <a-menu-item style="border-radius: 10px" key="pkRecord" data-obj="2"
          >PK记录
          <template #icon>
            <SvgIcon icon="pk" :size="20" />
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
      <!--      <a-empty />-->
      <MatchWeekRecordList v-if="selectedMenuKey === 'weekRecord'" />
      <PkRecordList v-else-if="selectedMenuKey === 'pkRecord'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import SvgIcon from "@/icons/SvgIcon";
import PkRecordList from "@/components/match/PkRecordList.vue";
import MatchWeekRecordList from "@/components/match/MatchWeekRecordList.vue";

const userStore = useUserStore();

const selectedMenuKey = ref("weekRecord");
const onClickMenu = (key: string) => {
  selectedMenuKey.value = key;
};
</script>

<style lang="scss" scoped>
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
</style>
