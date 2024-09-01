//引入项目中的全局组件
import SavIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 全局对象
const allGlobalComponent = { SavIcon, Pagination }

//对外暴露插件对象
export default {
    install(app) {
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key, allGlobalComponent[key]);
        })
    }
}