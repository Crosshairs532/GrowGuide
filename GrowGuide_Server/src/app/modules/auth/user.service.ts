import { sendResponse } from '../../utilities/sendResponse'
import { TUser } from './user.interface'
import { userModel } from './user.model'

const registrationDb = async (userData: TUser) => {
  // * check if any user exists or not
  const isExists = await userModel.findUser(userData.email)
  if (isExists) {
    return ''
  }

  const res = userModel.create(userData)
  return res
}
export const userService = {
  registrationDb,
}
