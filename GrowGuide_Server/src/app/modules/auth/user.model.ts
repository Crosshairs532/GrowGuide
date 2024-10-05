import { model, Schema } from 'mongoose'
import { TUser, TUserExist } from './user.interface'

const userSchema = new Schema<TUser, TUserExist>(
  {
    name: {
      type: String,
      required: [true, 'Name must be required'],
    },
    email: {
      type: String,
      required: [true, 'Email must be required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be required'],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.findUser = async (email: string) => {
  const res = await userModel.findOne({ email })
  return res
}

userSchema.statics.isPassWordMatch = async (email: string, password) => {
  const res = await userModel.find({ email })
}

export const userModel = model<TUser, TUserExist>('users', userSchema)
