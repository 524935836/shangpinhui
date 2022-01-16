import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 如果本地存储没有则添加
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
