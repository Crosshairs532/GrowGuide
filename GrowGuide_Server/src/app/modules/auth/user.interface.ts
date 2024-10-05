import { Model } from 'mongoose'

export interface TUser {
  name: string
  email: string
  password: string
  image: string
}
export interface TUserExist extends Model<TUser> {
  findUser: (email: string) => Promise<any>
}
