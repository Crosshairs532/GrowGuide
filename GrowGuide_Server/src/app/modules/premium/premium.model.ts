import { model, Schema, Types } from 'mongoose'
import { userModel } from '../user-management/user.model'

const premiumSchema = new Schema(
  {
    transactionId: {
      type: String,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    paymentStatus: {
      types: String,
      enum: ['pending', 'paid', 'cancelled'],
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

export const premiumModel = model('premiumUser', premiumSchema)

premiumSchema.post('save', async function (doc, next) {
  try {
    await userModel.findByIdAndUpdate(
      { _id: doc.userId },
      {
        $set: { status: 'Premium' },
      },
    )
    next()
  } catch (err: any) {
    next(err)
  }
})
