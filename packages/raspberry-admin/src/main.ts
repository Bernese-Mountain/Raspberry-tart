import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setPermission } from '@/permission'

// 引入全局样式
import '@/styles/index.scss'

async function appInit() {
    const app = createApp(App)
     
    // // 注册全局自定义组件
    // setupCustomComponents(app)
  
    app.use(ElementPlus)

    // 挂载状态管理
    setupStore(app)
  
    // 挂载路由
    setupRouter(app)
  
    // // 语言注册
    // app.use(i18n)
  
    // 挂载到页面
    app.mount('#app', true)
  
    // 挂载到 window
    window['$vue'] = app
  }
  
  appInit().then(() => {
    // 挂载权限管理
    setPermission();
    // 生产环境下挂载 mock
    const { mockXHR } = require('../mock')
    mockXHR()
  })
