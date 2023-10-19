import  { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import axios, { AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { deflate } from 'zlib';

  const service = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV, // url = base url + request url
    timeout: 5000 // request timeout
  })
  
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const store = useUserStore();

      if (store.hasToken) {
        config.headers['X-Token'] = getToken()
      }
      return config
    },
    (error: AxiosRequestConfig) => {
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  
  // 响应拦截器
  service.interceptors.response.use(
    (response: AxiosResponse) => {
      const store = useUserStore();
      const res = response.data
  
      // if the custom code is not 20000, it is judged as an error.
      if (res.code !== 20000) {
        ElMessage({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
  
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    (err: AxiosResponse) => {
      console.log('err' + err) // for debug
      ElMessage({
        // message: err.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(err)
    }
  )

export default service
