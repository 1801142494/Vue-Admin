// SKU模块接口
import request from '@/utils/request'
import { SkuResponseData } from './type'

// 枚举地址
enum API {
  // 获取已有商品SKU数据
  SKU_URL = '/admin/product/list/',
  // 已有商品上架
  SALE_URL = '/admin/product/onSale/',
  // 已有商品下架
  CANCEL_SALE_URL = '/admin/product/cancelSale/',
  // 获取sku详情
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除sku
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}

// 获取已有商品SKU数据
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}
// 已有商品上架
export const reqSaleSku = (skuId: number | string) => {
  return request.get<any, any>(API.SALE_URL + skuId)
}
// 已有商品下架
export const reqCancelSale = (skuId: number | string) => {
  return request.get<any, any>(API.CANCEL_SALE_URL + skuId)
}
// 获取sku商品详情
export const reqSkuInfo = (skuId: number | string) => {
  return request.get<any, any>(API.SKUINFO_URL + skuId)
}
// 删除sku
export const reqDeleteSku = (skuId: number | string) => {
  return request.delete<any, any>(API.DELETE_SKU_URL + skuId)
}
