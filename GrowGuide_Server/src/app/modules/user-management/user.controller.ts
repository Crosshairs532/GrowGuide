import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { userService } from './user.service'
import { sendResponse } from '../../utilities/sendResponse'
import { JwtPayload } from 'jsonwebtoken'

const profileUpdate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updateUserData = req.body
    const { email: loggedInUserEmail, _id: userId } = req.user as JwtPayload
    const response = await userService.updateProfileDb(
      updateUserData,
      loggedInUserEmail,
      userId,
    )

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: response,
    })
  },
)

export const userController = {
  profileUpdate,
}
