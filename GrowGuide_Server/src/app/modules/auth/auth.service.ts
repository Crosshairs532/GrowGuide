import configFiles from '../../../config'
import sendEmail from '../../utilities/sendEmail'

import jwt from 'jsonwebtoken'
import { userModel } from '../user-management/user.model'
import { TUser } from '../user-management/user.interface'

const registrationDb = async (userData: any) => {
  console.log(userData, 'user Registration Data')

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

const forgetPasswordDb = async (email: string) => {
  const link = `${configFiles.base_url}password-reset?email=${email}`
  await sendEmail(email, 'Reset password', link)
  return null
}

const resetPasswordDb = async (email: string, password: string) => {
  const res = await userModel.findOneAndUpdate(
    { email },
    { password },
    { new: true },
  )
  return res
}

export const authService = {
  registrationDb,
  loginDb,
  changePasswordDb,
  forgetPasswordDb,
  resetPasswordDb,
}
