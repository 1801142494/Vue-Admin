// spu管理模块接口
import request from "@/utils/request";
import type { HasSpuResponseData,AllTrademark,spuHasImg,SaleAttrResponseData,HasSaleAttrResponseData } from "./type";
enum API{
    // 获取已有的spu
    HASSPU_URL='/admin/product/',
    // 获取全部商品数据
    ALL_TRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    //获取某个spu下全部的售卖商品照片
    IMAGE_URL='/admin/product/spuImageList/',
    //获取某个spu的销售属性
    SPUHAS_SALEATTR_URL='/admin/product/spuSaleAttrList/',
    // 获取整个项目全部的销售属性[颜色、版本、尺寸]
    ALLSALEATTR_URL='/admin/product/baseSaleAttrList'
}
// 获取某个三级分类已有的spu
export const reqHasSpu =(page:number,limit:number,category3Id:number|string)=>{
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)
}
// 获取全部的spu的商品数据
export const reqAllTradeMark =()=>{
    return request.get<any,AllTrademark>(API.ALL_TRADEMARK_URL)
}
// 获取全部的spu的商品照片
export const reqSpuImage =(spuId:number)=>{
    return request.get<any,spuHasImg>(API.ALL_TRADEMARK_URL+spuId)
}
//获取某个spu的销售属性
export const reqSpuSaleAttr =(spuId:number)=>{
    return request.get<any,SaleAttrResponseData>(API.SPUHAS_SALEATTR_URL+spuId)
}
// 获取全部的销售属性
export const reqAllSaleAttr =()=>{
    return request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}
