import { Model } from 'mongoose'

export interface TUser {
  name: string
  email: string
  password: string
  image: string
  role: string
  needsPasswordChange: boolean
}

export interface TUserExist extends Model<TUser> {
  findUser: (email: string) => Promise<any>
}
