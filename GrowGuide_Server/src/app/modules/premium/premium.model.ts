import { model, Schema, Types } from 'mongoose'

const premiumSchema = new Schema(
  {
    transactionId: {
      type: String,
    },
    userId: [{ type: Schema.Types.ObjectId, ref: 'users' }],
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
