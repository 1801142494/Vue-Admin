//用户管理模块
import request from "@/utils/request";
import { User, UserResponseData } from "./type";

// 枚举
enum API{
    //获取全部已有用户账号信息
    ALLUSER_URL='/admin/acl/user/',
    // 新增管理用户
    ADDUSER_URL='/admin/acl/user/save',
    // 修改用户信息
    UPDATEUSER_URL='/admin/acl/user/update'
}

//获取全部已有用户账号信息
export const reqUserList=(page:number,limit:number)=>{
    return request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}`)
}
// 新增|更新 用户
export const reqAddOrUpdateUser=(data:User)=>{
    if(data.id){
        // 有id为更新数据
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        // 无id为新增数据
        return request.post<any,any>(API.ADDUSER_URL,data)
    }
}