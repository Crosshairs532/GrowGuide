import { model, Schema } from 'mongoose'
import { TPost } from './post.interface'

const postSchema = new Schema<TPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  images: {
    type: [String],
  },

  categories: {
    type: [String],
  },

  premium: {
    type: Boolean,
  },
  votes: {
    type: Number,
  },
  comments: {
    type: [
      {
        userId: Schema.Types.ObjectId,
        userComments: {
          type: [String],
        },
      },
    ],
    _id: false,
  },
})

export const postModel = model<TPost>('posts', postSchema)
