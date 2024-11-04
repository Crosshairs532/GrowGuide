import { model, Schema, Types } from 'mongoose'
import { userModel } from '../user-management/user.model'

const premiumSchema = new Schema(
  {
    transactionId: {
      type: String,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    paymentStatus: {
      type: String,
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

premiumSchema.post('save', async function (doc, next) {
  console.log(doc)
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

export const premiumModel = model('premiumUser', premiumSchema)
