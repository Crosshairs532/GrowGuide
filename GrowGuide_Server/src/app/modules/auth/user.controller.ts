import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { userService } from './user.service'
import { sendResponse } from '../../utilities/sendResponse'

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

  sendResponse(res, {
    success: true,
    status: 200,
    message: 'Login successful',
    data: response,
  })
})

export const userController = {
  Registration,
  Login,
}
