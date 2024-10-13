import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { userService } from './user.service'
import { sendResponse } from '../../utilities/sendResponse'
import { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import { userModel } from './user.model'

const profileUpdate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updateUserData = req.body

    const { email: loggedInUserEmail, _id: userId } = req.user as JwtPayload
    // console.log(req.user)

    // console.log(loggedInUserEmail, 'profile update.')

    const response = await userService.updateProfileDb(
      updateUserData,
      loggedInUserEmail,
      userId,
    )

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'Profile updated successfully',
      data: response,
    })
  },
)

const FollowUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const followedUserId = req.body //! ownId, followedId
    const response = await userService.followUserDb(followedUserId)

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'User followed successfully',
      data: response,
    })
  },
)

const unfollowUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userUnFollowInfo = req.body //! ownId, followedId
    const response = await userService.unFollowUserDb(userUnFollowInfo)
    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'User un-followed successfully',
      data: response,
    })
  },
)

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await userModel.find({})
    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'Users fetched successfully',

      data: response,
    })
  } catch (err: any) {
    console.log(err.message)
  }
}

const addToFav = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, postId } = req.body
    const response = await userService.addToFavDb(email, postId)
    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'Post added to fav successfully',
      data: response,
    })
  },
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query

    const response = await userService.getSingleUserDb(email as string)

    sendResponse(res, {
      success: true,
      status: httpStatus.OK,
      message: 'User fetched successfully',
      data: response,
    })
  },
)
export const userController = {
  profileUpdate,
  FollowUser,
  unfollowUser,
  getAllUsers,
  addToFav,
  getSingleUser,
}
