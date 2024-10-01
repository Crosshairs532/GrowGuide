import { sendResponse } from '../../utilities/sendResponse'
import { TUser } from './user.interface'
import { userModel } from './user.model'

const registrationDb = async (userData: TUser) => {
  const res = userModel.create(userData)
  return res
}
export const userService = {
  registrationDb,
}
