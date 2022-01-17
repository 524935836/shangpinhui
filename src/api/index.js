import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'GET' })
export const reqBannerList = () => mockRequests({ url: 'banner', method: 'GET' })
export const reqFloorList = () => mockRequests.get('floor')
export const reqSearchInfo = (params) => requests.post('list', params)
export const reqGoodsInfo = (params) => requests.get(`item/${params}`)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests.post(`cart/addToCart/${skuId}/${skuNum}`)
export const reqCartList = () => requests.get('cart/cartList')
export const reqDeleteCart = (params) => requests.delete(`cart/deleteCart/${params}`)
export const reqCheckCart = (skuId, isChecked) => requests.get(`cart/checkCart/${skuId}/${isChecked}`)
