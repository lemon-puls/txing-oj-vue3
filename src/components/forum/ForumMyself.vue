<template>
  <div id="forumMyselfId">
    <div class="left">
      <a-menu
        :style="{
          width: '150px',
          height: '100%',
          textAlign: 'center',
        }"
        :default-selected-keys="['works']"
        show-collapse-button
        @menu-item-click="onClickMenu"
      >
        <a-menu-item style="border-radius: 10px" key="works" data-obj="1"
          >我的帖子
          <template #icon>
            <SvgIcon icon="post" :size="20" />
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
      <ForumMyPost v-if="selectedMenuKey === 'works'" />
      <ForumPostFavour v-else-if="selectedMenuKey === 'favour'" />
      <a-empty v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ForumMyPost from "@/components/forum/ForumMyPost.vue";
import ForumPostFavour from "@/components/forum/ForumPostFavour.vue";
import SvgIcon from "@/icons/SvgIcon";

const selectedMenuKey = ref("works");
const onClickMenu = (key: string) => {
  selectedMenuKey.value = key;
};
</script>

<style scoped lang="scss">
#forumMyselfId {
  //width: 88vw;
  //height: 36vw;
  //max-width: 1250px;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  //background-color: white;
  .left {
    //width: 200px;
    //height: 48vh;
    //background-color: #e9d28a;
    width: 15%;

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
    width: 85%;
    flex: 1;
  }
}
</style>
