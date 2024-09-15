//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单是否折叠
      refresh: false, //判断是否刷新
    }
  },
})
export default useLayoutSettingStore
