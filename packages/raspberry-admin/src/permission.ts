import { useUserStore } from './store/modules/user'
import  Message from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { useRouter } from 'vue-router'

const router = useRouter();
export function setPermission(){
  // if(router)
  console.log('router', router);
  NProgress.configure({ showSpinner: false }) // NProgress Configuration

  const whiteList = ['/login'] // no redirect whitelist
  // const store = useUserStore();

  router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = 'title'

    // 暂时不用token验证登录，等待加入mock后再加入该功能
    // const hasToken = getToken()

    // if (hasToken) {
    //   if (to.path === '/login') {
    //     // if is logged in, redirect to the home page
    //     next({ path: '/' })
    //     NProgress.done()
    //   } else {
    //     const hasGetUserInfo = store.getters.name
    //     if (hasGetUserInfo) {
    //       next()
    //     } else {
    //       try {
    //         // get user info
    //         await store.dispatch('user/getInfo')

    //         next()
    //       } catch (error) {
    //         // remove token and go to login page to re-login
    //         await store.dispatch('user/resetToken')
    //         // Message.error(error || 'Has Error')
    //         next(`/login?redirect=${to.path}`)
    //         NProgress.done()
    //       }
    //     }
    //   }
    // } else {
      /* has no token*/

      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    // }
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
  console.log("3.permissionHasBeenSetted");
}

