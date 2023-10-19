import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

interface userInfomation {
  username: string,
  password: string
}
export const useUserStore = defineStore({
  id: 'useUserStore',
  state(): any {
    return {
      token: getToken(),
      name: '',
      avatar: ''
    }
  },
  getters: {
    hasToken(): Boolean {
      return (this.token) ? true : false
    },
  },
  actions: {
    login(userInfo: userInfomation) {
      const { username, password } = userInfo
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password }).then((response: { data: any }) => {
          const { data } = response
          this.token = data.token
          setToken(data.token)
          resolve()
        }).catch((error: any) => {
          // reject(error)  //无mock暂时前端写死
          resolve()
        })
      })
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.token).then((response:any) => {
          const { data } = response
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          const { name, avatar } = data
          this.name = name
          this.avatar = avatar
          resolve(data)
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    logout() {
      return new Promise<void>((resolve, reject) => {
        logout().then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          Object.assign(this.$state, {
            token: getToken(),
            name: '',
            avatar: ''
          })
          resolve()
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
    resetToken() {
      return new Promise<void>(resolve => {
        removeToken() // must remove  token  first
        Object.assign(this.$state, {
          token: getToken(),
          name: '',
          avatar: ''
        })
        resolve()
      })
    }
  }
})
