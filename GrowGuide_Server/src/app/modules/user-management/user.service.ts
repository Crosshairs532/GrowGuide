import { ObjectId } from 'mongodb'
import { TUser } from './user.interface'
import { userModel } from './user.model'

const updateProfileDb = async (
  updateData: TUser,
  email: string,
  userId: ObjectId,
) => {
  const isExists = await userModel.findUser(email as string)

  console.log({ userId })
  if (!isExists) {
    throw new Error('user does not exists!')
  }
  const updated = await userModel.findByIdAndUpdate(
    { _id: userId },
    updateData,
    {
      new: true,
    },
  )

  return updated
}

const followUserDb = async (followUser: any) => {
  const { myId, followedId } = followUser

  // ! this is the user who is following

  const CurrentUserFollowing = await userModel
    .findByIdAndUpdate(
      {
        _id: new ObjectId(myId),
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
    .populate({
      path: 'following',
    })

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

  console.log(CurrentUserFollowing, CurrentFollowingFollower)

  return { CurrentUserFollowing, CurrentFollowingFollower }
}

export const userService = {
  updateProfileDb,
  followUserDb,
}
