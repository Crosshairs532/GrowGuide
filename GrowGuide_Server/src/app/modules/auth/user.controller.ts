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

export const userController = {
  Registration,
}
