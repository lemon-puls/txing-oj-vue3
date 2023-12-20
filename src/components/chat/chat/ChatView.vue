<!--
* @ChatView
* @author Li zhiwei
* @date 2023/12/20 10:08
-->

<template>
  <div id="ChatView">
    <!--    <a-row class="grid-demo">-->
    <!--      &lt;!&ndash;      <a-col style="background-color: yellow" :span="1">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <div>6 - 25%</div>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </a-col>&ndash;&gt;-->
    <!--      <a-col :span="6">-->
    <!--        <SessionList />-->
    <!--      </a-col>-->
    <!--      <a-col style="background-color: blue" :span="14">-->
    <!--        <div>6 - 25%</div>-->
    <!--      </a-col>-->
    <!--      <a-col style="background-color: black" :span="4">-->
    <!--        <div>6 - 25%</div>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <a-split
      :style="{
        height: '100%',
        width: '80%',
        minWidth: '500px',
        borderRight: '1px solid var(--color-border)',
      }"
      :default-size="0.3"
    >
      <template #first>
        <SessionList />
      </template>
      <template #second>
        <div>
          <a-split
            direction="vertical"
            :style="{ height: '40vw' }"
            :default-size="0.7"
          >
            <template #first>
              <VirtualListTest />
            </template>
            <template #second>
              <SendBar />
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<style scoped>
#ChatView {
  flex: 1;
  background-color: #f5f5f5;
}
</style>

<script setup lang="ts"></script>
<script>
import SessionList from "@/components/chat/chat/sessionlist/SessionList";
import SendBar from "@/components/chat/chat/sendbar/SendBar";
import VirtualListTest from "@/views/test/VirtualListTest";

export default {
  components: { VirtualListTest, SendBar, SessionList },
};
</script>
