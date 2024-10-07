import { Types } from 'mongoose'
import { Model } from 'mongoose'

export interface TUser {
  name: string
  email: string
  password: string
  image: string
  role: string
  needsPasswordChange: boolean
  status?: string
  followers?: Array<Types.ObjectId>
  following?: Array<Types.ObjectId>
}

export interface TUserExist extends Model<TUser> {
  findUser: (email: string) => Promise<any>
}
