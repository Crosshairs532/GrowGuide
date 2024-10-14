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

const createComment = catchAsync(async (req: Request, res: Response) => {
  const postCommentData = req.body
  const response = await postService.createCommentDb(postCommentData)
  sendResponse(res, {
    success: true,
    data: response,
    status: httpStatus.OK,
    message: 'Comment created successfully',
  })
})

const UpDownVote = catchAsync(async (req: Request, res: Response) => {
  const { postId, votes } = req.body

  console.log(votes)
  const response = await postService.UpDownVoteDb(postId as string, votes)
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'voted successfully',
    data: response,
  })
})

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const response = await postService.getAllPostsDb()
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Posts fetched successfully',
    data: response,
  })
})

const postDelete = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.query

  console.log(postId)
  const response = await postService.postDeleteDb(postId as string)
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'post deleted Successfully',
    data: response,
  })
})
const postUpdate = catchAsync(async (req: Request, res: Response) => {
  const postData = req.body

  const response = await postService.postUpdateDb(postData)
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'post updated Successfully',
    data: response,
  })
})

const postComment = catchAsync(async (req: Request, res: Response) => {
  const { action } = req.body

  switch (action) {
    case 'delete':
      const { commentId } = req.body
      const response = await postService.PostCommentUpdate(action, commentId)
      sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: 'comment deleted Successfully',
        data: response,
      })
      break
    case 'edit':
      const {
        commentId: editCommentId,
        comment,
        post,
        updatedComment,
      } = req.body
      const responseComment = await postService.PostCommentUpdate(
        action,
        editCommentId,
        updatedComment,
      )
      sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: 'comment updated Successfully',
        data: responseComment,
      })
      break
  }
})

export const postController = {
  createPost,
  createComment,
  UpDownVote,
  getAllPosts,
  postDelete,
  postUpdate,
  postComment,
}
