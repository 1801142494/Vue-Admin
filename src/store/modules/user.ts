//创建用户相关小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin } from "@/api/user";
// 引入数据类型
import type { loginFormData,loginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
// 引入操作本地存储的工具方法
import { SET_TOKEN,GET_TOKEN } from "@/utils/token";
// 引入路由
import { constantRoute } from "@/router/routers";
// 创建小仓库
let useUserStore =defineStore('User',{
    //小仓库存储数据的地方
    state:():UserState=>{
        return{
            token:GET_TOKEN() || '',
            menuRoutes:constantRoute,//仓库存储生成菜单需要数组（路由）
        }
    },
    actions:{
        // 用户登录的方法 async异步修饰将返回promise对象
        async userLogin(data:loginFormData){
            let result:loginResponseData= await reqLogin(data)
            // 请求成功
            if(result.code==200){
                // pinia仓库存储token
                // pinia|vuex存储数据其实是利用js对象
                this.token=(result.data.token as string);
                // 本地存储持久化
                SET_TOKEN(result.data.token as string)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters:{

    }
});

export default useUserStore;
