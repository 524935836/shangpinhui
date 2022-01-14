import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'GET' })
export const reqBannerList = () => mockRequests({ url: 'banner', method: 'GET' })
export const reqFloorList = () => mockRequests.get('floor')
export const reqSearchInfo = (params) => requests.post('list', params)
export const reqGoodsInfo = (params) => requests.get(`item/${params}`)
