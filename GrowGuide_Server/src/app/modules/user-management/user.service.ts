import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { TUser } from './user.interface'
import { userModel } from './user.model'
import { postModel } from '../post/post.model'
import configFiles from '../../../config'

const updateProfileDb = async (
  updateData: TUser,
  email: string,
  userId: ObjectId,
) => {
  console.log(updateData)

  const isExists = await userModel.findUser(email as string)

  console.log(userId, 'looking')
  if (!isExists) {
    throw new Error('user does not exists!')
  }
  try {
    const updated = await userModel.findOneAndUpdate(
      { _id: userId },
      updateData,
      {
        new: true,
      },
    )
    // !make new Token

    console.log({ updateData })
    if (updated) {
      const tokenData = { ...updated.toObject() }

      const token = jwt.sign(tokenData, configFiles.jwt_secret as string, {
        expiresIn: '2d',
      })

      return { ...updated.toObject(), accessToken: token }
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const followUserDb = async (followUser: any) => {
  const { myId, followedId } = followUser

  // ! this is the user who is following

  const CurrentUserFollowing = await userModel
    .findOneAndUpdate(
      {
        _id: myId,
      },
      {
        $addToSet: {
          following: { $each: [followedId] },
        },
      },
      {
        new: true,
      },
    )
    .populate('following')

  // ! this is the user who is being followed
  const CurrentFollowingFollower = await userModel
    .findByIdAndUpdate(
      {
        _id: new ObjectId(followedId),
      },
      {
        $addToSet: {
          followers: { $each: [myId] },
        },
      },
      {
        new: true,
      },
    )
    .populate('followers')

  // console.log(CurrentUserFollowing, CurrentFollowingFollower)

  return { CurrentUserFollowing, CurrentFollowingFollower }
}

const unFollowUserDb = async (userUnFollowInfo: any) => {
  const { myId, unfollowId } = userUnFollowInfo

  // console.log(myId, 'what is this ')
  // ! first delete from my list.
  const userUnfollowed = await userModel.findByIdAndUpdate(
    { _id: new ObjectId(myId) },
    {
      $pull: {
        following: unfollowId,
      },
    },
  )

  // ! then delete from the other user's list.
  const res = await userModel.findByIdAndUpdate(
    { _id: new ObjectId(unfollowId) },
    {
      $pull: {
        followers: myId,
      },
    },
  )

  return { userUnfollowed, res }
}

const addToFavDb = async (email: string, postId: string, userId: string) => {
  const res = await userModel
    .findOneAndUpdate(
      {
        email,
      },
      {
        $addToSet: {
          favourites: { $each: [postId] },
        },
      },
      {
        new: true,
      },
    )
    .populate({
      path: 'favourites',
    })

  const PostRes = await postModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $addToSet: {
        favourite: { $each: [userId] },
      },
    },
    {
      new: true,
    },
  )

  return res
}

const removeFavDb = async (email: string, postId: string, userId: string) => {
  const res = await userModel
    .findOneAndUpdate(
      {
        email,
      },
      {
        $pull: {
          favourites: { $in: [postId] },
        },
      },
      {
        new: true,
      },
    )
    .populate({
      path: 'favourites',
    })

  const PostRes = await postModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $pull: {
        favourite: { $in: [userId] },
      },
    },
    {
      new: true,
    },
  )

  return res
}

const getSingleUserDb = async (id: string) => {
  // console.log(id, 'check id')
  const res = await userModel
    .findById(id)
    .populate('following')
    .populate('followers')
    .populate('favourites')

  // console.log(res, 'check user')
  return res
}

const adminUserDeleteDb = async (id: string) => {
  const res = await userModel.findByIdAndDelete(id)
  return res
}

export const userService = {
  updateProfileDb,
  followUserDb,
  unFollowUserDb,
  addToFavDb,
  getSingleUserDb,
  adminUserDeleteDb,
  removeFavDb,
}
