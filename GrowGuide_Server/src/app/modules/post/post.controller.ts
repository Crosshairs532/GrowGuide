import { TPost } from './post.interface'
import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { postService } from './post.service'
import { sendResponse } from '../../utilities/sendResponse'
import httpStatus from 'http-status'

const createPost = catchAsync(async (req: Request, res: Response) => {
  // !form data
  const postData = req.body

  const response = await postService.createPostDb(postData)
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Post created successfully',
    data: response,
  })
})

export const postController = {
  createPost,
}
