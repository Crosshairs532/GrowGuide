import { ObjectId } from 'mongodb'
import httpStatus from 'http-status'
import AppError from '../../middlewares/AppError'
import { TComment, TPost } from './post.interface'
import { postModel } from './post.model'

const createPostDb = async (postData: TPost) => {
  // console.log(postData, 'service')
  const posted = (await postModel.create(postData)).populate('user')

  // console.log(posted)
  return posted
}

const createCommentDb = async (commentData: TComment) => {
  const { postId, commenterId, userComments } = commentData
  //   const post = await postModel.findByIdAndUpdate(
  //     {
  //       _id: commentData.postId,
  //       'comments.userId': commenterId,
  //     },
  //     {
  //       $push: {
  //         'comments.$.userComments': userComments,
  //       },
  //     },
  //     {
  //       upsert: true,
  //       new: true,
  //     },
  //   )

  //   const post = await postModel.findOneAndUpdate(
  //     {
  //       _id: postId,
  //       'comments.userId': commenterId,
  //     },
  //     {
  //       $push: { 'comments.$.userComments': userComments },
  //     },
  //     {
  //       new: true, // Return the updated document
  //     },
  //   )

  const post = await postModel
    .findOneAndUpdate(
      {
        _id: postId,
        // 'comments.userId': commenterId,
      },
      {
        $push: { comments: { userId: commenterId, userComments } },
      },
      {
        new: true,
      },
    )
    .lean()

  if (!post) {
    const addNewComment = await postModel.findByIdAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: { userId: commenterId, userComments: [userComments] },
        },
      },
      {
        new: true,
      },
    )

    return addNewComment
  }

  return post
}

const UpDownVoteDb = async (postId: string, val: string, userId: string) => {
  // console.log(postId, val, 'this is upvote service')
  const res = await postModel.findByIdAndUpdate(
    { _id: postId },
    {
      $inc: {
        votes: parseInt(val),
      },
    },
    {
      new: true,
    },
  )
  return res
}

const getAllPostsDb = async (search: any) => {
  const query: any = {}
  const { category, other, nextId, limit } = search

  if (category) {
    const categoryQueries = category.split('-').map((cat: any) => {
      return { categories: { $regex: cat, $options: 'i' } }
    })
    query.$or = categoryQueries
  }
  if (other) {
    query['description'] = { $regex: other, $options: 'i' }
  }

  let lim
  if (limit) {
    lim = limit
  } else {
    lim = 1
  }

  console.log(lim, 'limit checking ', nextId, 'skipping')
  const res = await postModel
    .find(query)
    .sort({
      votes: -1,
    })
    .limit(lim)
    .skip(Number(nextId) || 0)
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
      },
    })

  const countPosts = await postModel.countDocuments(query)

  const hasMorePosts = countPosts > (Number(nextId) || 0) + res.length

  return {
    data: res,
    nextId: hasMorePosts ? (Number(nextId) || 0) + res?.length : null, // Increment nextId if more posts are available
  }
}

const postDeleteDb = async (postId: string) => {
  try {
    const res = await postModel.findByIdAndDelete(
      { _id: postId },
      {
        new: true,
      },
    )
    return res
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const postUpdateDb = async (updatedData: any) => {
  const { post, ...other } = updatedData
  const newdata = { ...post, ...other }

  const {
    post: { _id },
  } = updatedData
  const res = await postModel.findByIdAndUpdate(
    {
      _id,
    },
    newdata,
    {
      new: true,
    },
  )
  return res
}

const postCommentDb = async (postId: string) => {
  const res = await postModel.findById(postId, {})
}

const PostCommentUpdate = async (
  action: string,
  commentId: string,
  updatedComment = '',
) => {
  switch (action) {
    case 'delete':
      const res = await postModel.findOneAndUpdate(
        {
          'comments._id': commentId,
        },
        {
          $pull: {
            comments: {
              _id: commentId,
            },
          },
        },
      )

      return res

    case 'edit':
      const commentUpdated = await postModel.findOneAndUpdate(
        {
          'comments._id': commentId,
        },
        {
          $set: {
            'comments.$.userComments': updatedComment,
          },
        },
      )
      return commentUpdated
  }
}

const getLoggedInUserPosts = async (userId: string) => {
  // console.log(userId)
  try {
    const res = await postModel.find({ user: userId })

    return res
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Something went wrong! Cannot Get posts!',
    )
  }
}

const postChartDb = async () => {
  const res = await postModel.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        totalPosts: {
          $sum: 1,
        },
        votes: { $sum: '$votes' },
      },
    },
  ])

  return res
}

const getSinglePostDb = async (postId: string) => {
  const res = await postModel.findById(postId)
  return res
}

export const postService = {
  createPostDb,
  createCommentDb,
  UpDownVoteDb,
  getAllPostsDb,
  postDeleteDb,
  postUpdateDb,
  postCommentDb,
  PostCommentUpdate,
  getLoggedInUserPosts,
  postChartDb,
  getSinglePostDb,
}
