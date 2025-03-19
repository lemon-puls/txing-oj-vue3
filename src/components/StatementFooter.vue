<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© {{ currentYear }} WS Txing</span>
      <span class="divider">|</span>
      <a href="https://beian.miit.gov.cn/" target="_blank" class="beian-link">{{
        icpNumber
      }}</a>
      <span class="divider">|</span>
      <span>Version 1.0.0</span>
      <span class="divider">|</span>
      <span>All Rights Reserved</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());

const icpNumber = process.env.VUE_APP_ICP_NUMBER;
</script>

<style scoped lang="scss">
.footer {
  width: auto;
  padding: 12px 0;
  background-color: #fafafa;
  border-top: 1px solid #eee;

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    color: #666;
    font-size: 14px;

    .divider {
      color: #999;
    }

    .beian-link {
      color: #666;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
