<template>
    <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <div class="fixed-header" />
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navbar, AppMain } from './components'
import Sidebar from './components/Sidebar/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useRouter, useRoute } from 'vue-router'
import router from '@/router/index'
import { watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
  const routes = router.getRoutes();
  const route = useRoute()

  const { body } = document
  const WIDTH = 992 // refer to Bootstrap's responsive design
  const store = useAppStore();
  const device = store.device;
  const sidebar = store.sidebar;
  // const fixedHeader = store.fixedHeader;
  const classObj = {
        hideSidebar: !store.sidebar.opened,
        openSidebar: store.sidebar.opened,
        withoutAnimation: store.sidebar.withoutAnimation,
        mobile: store.device === 'mobile'
      }

  const $_isMobile = () => {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
      }
  const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile()
        store.toggleDevice(isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.closeSideBar(true);
        }
      }
    }
  const handleClickOutside = () => {
      store.closeSideBar(false);
    }    

  watch(
    () => route, 
    (route: any) => {
      if (device === 'mobile' && store.sidebar.opened) {
          store.closeSideBar(false);
        }
      },
      { deep: true}
  )
  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  }),

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  })
</script>
<style lang="scss" scoped>
  @import "../styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{210px});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>

