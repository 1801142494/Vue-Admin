// 路由鉴权

// 1.通过nprogress包实现路由跳转进度条效果
// 2.路由鉴权的设置
//      未登录：只能访问登录页面
//      登录成功：不能访问登录页面
import router from '@/router'
import setting from './setting'
// 引入进度条
import nprogress from 'nprogress'
nprogress.configure({ showSpinner: false })
// 引入进度条样式
import 'nprogress/nprogress.css'
// 获取用户相关小仓库，获取token判断是否登录
// 注：组件外使用小仓库要先引入大仓库
import pinia from './store'
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)

// // 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 修改浏览器标题
  document.title = setting.title + '-' + to.meta.title
  // 进度条
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    // 用户登录
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 判断是否有用户信息
      if (username) {
        next()
      } else {
        // 如果没用户信息，在路这里发送获取信息的请求再放行
        try {
          // 获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          console.log(error)
          // token过期
          // 用户手动修改token

          // 用户退出->清除相关数据
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done()
})
