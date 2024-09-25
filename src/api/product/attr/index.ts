// 属性相关api文件
import request from '@/utils/request'
// 引入数据类型
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
// 地址
enum API {
  // 一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  // 二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  // 三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  // 获取分类下已有属性
  ATTR_URL = '/admin/product/attrInfoList/',
  // 新增或修改属性
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  //删除
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 获取二级分类接口方法
export const reqC2 = (category1Id: number | string) =>
  request.get<any, any>(API.C2_URL + category1Id)
// 获取三级分类接口方法
export const reqC3 = (category2Id: number | string) =>
  request.get<any, any>(API.C3_URL + category2Id)
// 获取对应分类下已有属性
export const reqAttr = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`,
  )
}
// 新增或修改属性
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
}
// 删除属性
export const reqDeleteAttr = (attrId: number | any) => {
  return request.delete<any, any>(API.DELETE_ATTR_URL + attrId)
}
