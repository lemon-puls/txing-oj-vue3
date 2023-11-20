<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://gitee.com/lemon_plus" target="_blank">
          Txing By Bitdf
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  background: #ffffff;
  /*margin-bottom: 16px;*/
  box-shadow: #eee 1px 1px 5px;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5000;
}

#basicLayout .content {
  /*background: linear-gradient(to right, #eee, #fff);*/
  background: url("../assets/背景1.png") 0% 0% / 100% 100%;
  /*filter: blur(10px);*/
  /*margin-bottom: 16px;*/
  /*padding: 20px;*/
  /*自己加的*/
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
}

#basicLayout .footer {
  background: #e9d28a;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  text-align: center;
  z-index: 9999;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>
