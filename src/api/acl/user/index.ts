//用户管理模块
import request from "@/utils/request";
import { UserResponseData } from "./type";

// 枚举
enum API{
    //获取全部已有用户账号信息
    ALLUSER_URL='/admin/acl/user/',
}

//获取全部已有用户账号信息
export const reqUserList=(page:number,limit:number)=>{
    return request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}`)
}