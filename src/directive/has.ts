//引入大仓库
import pinia from '@/store'
//引入用户小仓库，获取相关按钮权限
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  // 全局自定义指令，实现按钮权限的检测
  app.directive('has', {
    //这个自定义指令的dom组件在挂在完毕的时候调用
    // el:指调用这个指令的dom元素
    // options:指令的具体数值
    mounted(el: any, options: any) {
      // 判断用户是否有按钮权限
      if (!userStore.buttons.includes(options.value)) {
        // 找到父节点销毁自身
        el.parentNode.removeChild(el)
      }
    },
  })
}
