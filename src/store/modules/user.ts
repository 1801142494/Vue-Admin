//创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由
import { constantRoute,asnycRoute,anyRoute } from '@/router/routers'
import router from '@/router'
// 引入lodash插件用于深拷贝(引入的是js文件没有)
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute:any,routes:any){
  return asnycRoute.filter((item:any)=>{
    // 如果routes包含asnycRoute继续
    if(routes.includes(item.name)){
      // 如果还有子路由，且子路由大于0个，进行递归
      if(item.children && item.children.length>0){
        filterAsyncRoute(item.children,routes)
      }
      return true
    }
  })
}

// 创建小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN() || '',
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法 async异步修饰将返回promise对象
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      // 请求成功
      if (result.code == 200) {
        // pinia仓库存储token
        // pinia|vuex存储数据其实是利用js对象
        this.token = result.data
        // 本地存储持久化
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      // 获取用户信息存储到仓库
      const result = await reqUserInfo()
      // 如果获取用户信息成功，就存储信息
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        // 计算当前用户需要展示的异步路由
        let userAsyncRoute= filterAsyncRoute(cloneDeep(asnycRoute),result.data.routes)
        // 重新给存储的路由赋值
        this.menuRoutes = [...constantRoute,...userAsyncRoute,...anyRoute]
        // 追加注册路由
        let addRouters =[...userAsyncRoute,...anyRoute]
        console.log(this.menuRoutes);
        addRouters.forEach((route:any)=>{
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录的方法
    async userLogout() {
      // 退出登录的请求
      const result = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN() //清除本地存储的token
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
