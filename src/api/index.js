import requests from './request'
import mockRequests from './mockRequest'

export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'GET' })
export const reqBannerList = () => mockRequests({ url: 'banner', method: 'GET' })
