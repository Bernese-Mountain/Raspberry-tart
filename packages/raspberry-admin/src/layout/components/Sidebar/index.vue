<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { computed, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import router from '@/router/index'
const store = useAppStore();
const routes = router.options.routes;
console.log('routes', routes);
const route = useRoute()
const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
});
const showLogo = false;
const isCollapse = computed(() => !store.sidebar.opened);
</script>
