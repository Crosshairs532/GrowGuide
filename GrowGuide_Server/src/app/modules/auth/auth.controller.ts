import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'

import { sendResponse } from '../../utilities/sendResponse'
import { JwtPayload } from 'jsonwebtoken'
import { authService } from './auth.service'

const Registration = catchAsync(async (req: Request, res: Response) => {
  const registrationData = req.body

  const response = await authService.registrationDb(registrationData)

  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Registration successful',
    data: response,
  })
})

const Login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body
  const response = await authService.loginDb(loginData)
  res.cookie('accessToken', response!.accessToken, { maxAge: 20000 })
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Login successful',
    data: response,
  })
})
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req?.user as JwtPayload
  const { oldPassword, newPassword } = req.body

  if (!(password === oldPassword)) {
    throw new Error('old password Does not match!')
  }

  const response = await authService.changePasswordDb(email, newPassword)
  res.clearCookie('accessToken')
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Password changed successfully',
    data: response,
  })

  // !check that logged in user and the given old password matches
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req?.user as JwtPayload
  const response = await authService.forgetPasswordDb(email)
  return null
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email: verifiedEmail } = req?.user as JwtPayload
  const { email } = req.query
  const { newPassword } = req.body

  if (!(verifiedEmail === email)) {
    throw new Error('You are not Authorized!')
  }
  const response = await authService.resetPasswordDb(
    email as string,
    newPassword,
  )
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Password reset successfully',
    data: response,
  })
})

export const authController = {
  Registration,
  Login,
  changePassword,
  forgetPassword,
  resetPassword,
}
