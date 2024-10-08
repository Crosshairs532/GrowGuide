import { Types } from 'mongoose'

export type TPost = {
  user: Types.ObjectId
  images: string[]
  categories: string[]
  premium: boolean
}
