import { TComment, TPost } from './post.interface'
import { postModel } from './post.model'

const createPostDb = async (postData: TPost) => {
  console.log(postData)
  const posted = await postModel.create(postData)
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

export const postService = {
  createPostDb,
  createCommentDb,
}
