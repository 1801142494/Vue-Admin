//引入项目中的全局组件
import SavIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
// 引入ElementPlus的所有的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allGlobalComponent = { SavIcon, Pagination,Category }

//对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 注册ElementPlus的所有的图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
