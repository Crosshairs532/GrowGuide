import { TComment, TPost } from './post.interface'
import { postModel } from './post.model'

const createPostDb = async (postData: TPost) => {
  console.log(postData)
  const posted = (await postModel.create(postData)).populate('user')
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

  const post = await postModel.findOneAndUpdate(
    {
      _id: postId,
      'comments.userId': commenterId,
    },
    {
      $push: { 'comments.$.userComments': userComments },
    },
    {
      new: true,
    },
  )

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

const UpDownVoteDb = async (postId: string, val: string) => {
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

const getAllPostsDb = async () => {
  const res = await postModel.find({}).populate('user')
  return res
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
    throw new Error(error.message)
  }
}

const postUpdateDb = async (updatedData: any) => {
  const {
    post: { _id },
  } = updatedData
  const res = await postModel.findByIdAndUpdate(
    {
      _id,
    },
    updatedData,
    {
      new: true,
    },
  )
  return res
}
export const postService = {
  createPostDb,
  createCommentDb,
  UpDownVoteDb,
  getAllPostsDb,
  postDeleteDb,
  postUpdateDb,
}
