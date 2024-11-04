import { ObjectId } from 'mongodb'
import { Types } from 'mongoose'
export type TComment = {
  commenterId: Types.ObjectId
  postId: Types.ObjectId
  userComments: String[]
}

export type TPost = {
  user: Types.ObjectId
  images: string[]
  categories: string[]
  premium: boolean
  votes: number
  comments?: TComment
  description: string
  favourite: Types.ObjectId[]
}
