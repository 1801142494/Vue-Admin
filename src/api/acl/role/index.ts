// 角色管理模块
import request from '@/utils/request'
import type { RoleData, RoleResponseData, MenuResponseData } from './type'

enum API {
  // 获取全部的职位
  ALLROLE_URL = '/admin/acl/role/',
  // 添加职位的接口
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有职位的接口
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 根据角色获取菜单
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  // 给角色分配权限
  SETPERMISSTION_URL = '/admin/acl/permission/doAssign/?',
  // 删除角色
  DELETEROLE_URL = '/admin/acl/role/remove/',
}

// 获取全部的职位
export const reqAllRoleList = (
  page: number,
  limit: number,
  keyword: string,
) => {
  return request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${keyword}`,
  )
}
// 添加职位的接口
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    //如果有id为更新数据
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    //无id为新增数据
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
// 根据角色获取菜单
export const reqAllPermisstion = (roleId: number | string) => {
  return request.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roleId)
}
// 给角色分配权限
export const reqSetPermisstion = (roleId: number, permissionId: number) => {
  return request.post<any, any>(
    API.SETPERMISSTION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}
// 删除已有职位
export const reqDeleteRole = (id: number) => {
  return request.delete<any, any>(API.DELETEROLE_URL + id)
}
