//用户管理模块
import request from '@/utils/request'
import {
  AllRoleResponseData,
  SetRoleData,
  User,
  UserResponseData,
} from './type'

// 枚举
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 新增管理用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户信息
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部职位，当前账号拥有的职位接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 分配角色职务
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除用户
  DELETE_USER_URL = '/admin/acl/user/remove/',
  // 批量删除用户
  DELETE_USERLIST_URL = '/admin/acl/user/batchRemove',
}

//获取全部已有用户账号信息
export const reqUserList = (page: number, limit: number, username: string) => {
  return request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
}
// 新增|更新 用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    // 有id为更新数据
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    // 无id为新增数据
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
//获取全部角色职位和当前角色已有职位
export const reqAllRole = (userId: number | string) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}
//给用户分配角色职位
export const reqSetUserRole = (data: SetRoleData) => {
  return request.post<any, any>(API.SETROLE_URL, data)
}
//删除用户
export const reqDeleteUser = (id: number | string) => {
  return request.delete<any, any>(API.DELETE_USER_URL + id)
}
// 批量删除用户
export const reqDeleteUserList = (idList: number[]) => {
  return request.delete<any, any>(API.DELETE_USERLIST_URL, { data: idList })
}
