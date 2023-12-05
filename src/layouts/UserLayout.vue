<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/txing-oj.png" class="logo" />
        </a-space>
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

<style>
#userLayout .header {
  /*background: red;*/
  /*margin-bottom: 16px;*/
  /*box-shadow: #eee 1px 1px 5px;*/
  margin-top: 16px;
  line-height: 150px;
  text-align: right;
  margin-right: 100px;
}

#userLayout .content {
  /*background: linear-gradient(to right, #bbb, #fff);*/
  /*margin-bottom: 16px;*/
  padding: 20px;
}

#userLayout .footer {
  /*background: #f1dc27;*/
  padding: 16px;
  /*position: absolute;*/
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#userLayout .footer a {
  color: white;
}

#userLayout .logo {
  /*width: 64px;*/
  height: 81px;
  margin-top: 20px;
}

#userLayout {
  text-align: center;
  background: url("../assets/背景1.png") 0% 0% / 100% 100%;
  background-size: cover;
  background-attachment: fixed;
}
</style>
<script></script>
