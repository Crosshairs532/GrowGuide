import configFiles from '../../../config'
import { sendResponse } from '../../utilities/sendResponse'
import { TUser } from './user.interface'
import { userModel } from './user.model'
import jwt from 'jsonwebtoken'
const registrationDb = async (userData: TUser) => {
  // * check if any user exists or not
  const isExists = await userModel.findUser(userData.email)
  if (isExists) {
    throw new Error('user already exists!')
  }

  const newUserData = { ...userData, needsPasswordChange: false }

  const res = await userModel.create(newUserData)
  return res
}

const loginDb = async (userData: Partial<TUser>) => {
  const { email } = userData
  // * check if any user exists or not
  const isExists = await userModel.findUser(email as string)
  if (!isExists) {
    throw new Error('user does not exists!')
  }
  const token = jwt.sign(userData, configFiles.jwt_secret as string, {
    expiresIn: '2d',
  })
  return {
    accessToken: token,
  }
}
const changePasswordDb = async (email: string, password: string) => {
  const res = await userModel.findOneAndUpdate(
    { email },
    { password },
    { new: true },
  )
  return res
}

export const userService = {
  registrationDb,
  loginDb,
  changePasswordDb,
}
