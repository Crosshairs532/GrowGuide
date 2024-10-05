import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { userService } from './user.service'
import { sendResponse } from '../../utilities/sendResponse'
import { JwtPayload } from 'jsonwebtoken'

const Registration = catchAsync(async (req: Request, res: Response) => {
  const registrationData = req.body

  console.log(registrationData)
  const response = await userService.registrationDb(registrationData)

  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Registration successful',
    data: response,
  })
})

const Login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body
  const response = await userService.loginDb(loginData)
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

  const response = await userService.changePasswordDb(email, newPassword)
  res.clearCookie('accessToken')
  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Password changed successfully',
    data: response,
  })

  // !check that logged in user and the given old password matches
})

export const userController = {
  Registration,
  Login,
  changePassword,
}
