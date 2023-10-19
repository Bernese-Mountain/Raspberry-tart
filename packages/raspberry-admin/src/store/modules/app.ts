import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

// 编辑区域内容
export const useAppStore = defineStore({
  id: 'useAppStore',
  state: (): any => ({
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop'
  }),
  getters: {
    //
  },
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1');
      } else {
        Cookies.set('sidebarStatus', '0')
      }
      console.log("this.sidebar", this.sidebar, 'Cookies', Cookies);
    },
    closeSideBar(withoutAnimation: Boolean) {
      Cookies.set('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    }
  }
})
