import { createApp } from 'vue'
import App from '@/App.vue'
// 引入ElementPlus组件库
import ElementPlus from 'element-plus'
// 引入ElementPlus组件库的样式
import 'element-plus/dist/index.css'
// 引入国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入模板的全局样式
import './styles/index.scss'
// svg插件需要配置的代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象，注册整个项目全局组件
import globalComponent from '@/components'
//引入路由
import router from './router/index'
// 引入仓库
import pinia from './store'

// 获取应用实例应用对象
const app = createApp(App)
// 使用组件库
app.use(ElementPlus, {
  // 设置中文
  locale: zhCn,
})
// 安装自定义插件
app.use(globalComponent)
// 安装仓库
app.use(pinia)
// 注册模板路由
app.use(router)
// 挂载应用
app.mount('#app')
