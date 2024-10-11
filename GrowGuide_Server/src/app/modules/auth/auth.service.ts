import configFiles from '../../../config'
import sendEmail from '../../utilities/sendEmail'

import jwt from 'jsonwebtoken'
import { userModel } from '../user-management/user.model'
import { TUser } from '../user-management/user.interface'

const registrationDb = async (userData: any) => {
  // console.log(userData, 'user Registration Data')

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
  console.log(userData, isExists)
  const tokenData = { ...isExists?._doc }
  console.log({ tokenData })
  if (!isExists) {
    throw new Error('user does not exists!')
  }
  const token = jwt.sign(tokenData, configFiles.jwt_secret as string, {
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
  const isExist = await userModel.findUser(email)

  console.log(isExist)
  if (!isExist) {
    throw new Error('This User Does not Have any account!')
  }
  const tokenData = {
    name: isExist.name,
    email: isExist.email,
  }
  const accessToken = jwt.sign(tokenData, configFiles.jwt_secret as string, {
    expiresIn: '10000',
  })

  console.log(accessToken)

  const link = `${configFiles.frontend_url}password-reset?email=${email}&accessToken=${accessToken}`
  const res = await sendEmail(email, 'Reset password', link, isExist?.name)
  console.log(res, 'send mail')
  return res
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
