import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
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
})

export const userModel = model<TUser>('users', userSchema)
