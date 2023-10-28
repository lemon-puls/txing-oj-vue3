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
  /*background: red;*/
  /*margin-bottom: 16px;*/
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  /*background: linear-gradient(to right, #eee, #fff);*/
  background: url("../assets/背景1.png") 0% 0% / 100% 100%;
  /*filter: blur(10px);*/
  /*margin-bottom: 16px;*/
  padding: 20px;
  /*自己加的*/
  display: flex;
  justify-content: center;
}

#basicLayout .footer {
  background: #f1dc27;
  padding: 16px;
  /*position: absolute;*/
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>
