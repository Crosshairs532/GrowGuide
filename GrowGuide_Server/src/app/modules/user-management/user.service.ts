import { ObjectId } from 'mongoose'
import { TUser } from './user.interface'
import { userModel } from './user.model'

const updateProfileDb = async (
  updateData: TUser,
  email: string,
  userId: ObjectId,
) => {
  const isExists = await userModel.findUser(email as string)
  if (!isExists) {
    throw new Error('user does not exists!')
  }
  const updated = await userModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  })

  return updated
}

export const userService = {
  updateProfileDb,
}
