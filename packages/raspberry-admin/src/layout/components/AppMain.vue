<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition> -->

    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import router from '@/router';

const key = '1'
// const key = computed(() => {
//     return router.path
// });
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
