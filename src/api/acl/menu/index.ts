//菜单管理模块
import request from '@/utils/request'
import type { MenuParams, PermisstionResponseData } from './type'

enum API {
  // 获取全部菜单与按钮的表示数据
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 新增菜单
  ADD_PERMISSION_URL = '/admin/acl/permission/save',
  // 修改菜单
  UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
  // 删除菜单
  DELETE_PERMISSION_URL = '/admin/acl/permission/remove/',
}

// 获取全部菜单与按钮的表示数据
export const reqAllPermisstion = () => {
  return request.get<any, PermisstionResponseData>(API.ALLPERMISSION_URL)
}
// 新增|修改菜单数据
export const reqAddOrUpdatePermisstion = (data: MenuParams) => {
  if (data.id) {
    // 有id为更新
    return request.put<any, any>(API.UPDATE_PERMISSION_URL, data)
  } else {
    // 无id为添加
    return request.post<any, any>(API.ADD_PERMISSION_URL, data)
  }
}
// 删除菜单
export const reqDeletePermisstion = (id: number) => {
  return request.delete<any, any>(API.DELETE_PERMISSION_URL + id)
}
