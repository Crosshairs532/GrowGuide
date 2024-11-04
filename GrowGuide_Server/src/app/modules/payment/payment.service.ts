import axios from 'axios'
import configFiles from '../../../config'
import { generate_transaction_id } from '../../utilities/GenerateTranId'
import { premiumModel } from '../premium/premium.model'

const InitializePaymentDb = async (user: any) => {
  const transactionID = generate_transaction_id(user?.name)

  if (transactionID) {
    const res = await axios.post(configFiles.payment_url!, {
      store_id: 'aamarpaytest',
      tran_id: transactionID,
      success_url: `https://grow-guide-server.vercel.app/api/growGuide/payment/premium?id=${user._id}&transactionId=${transactionID}&status=success`,
      fail_url: `https://grow-guide-server.vercel.app/api/growGuide/payment/premium?transactionId=${transactionID}&status=Failed`,
      cancel_url: 'https://grow-guide-client.vercel.app/',
      amount: '100.00',
      currency: 'BDT',
      signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
      desc: 'Merchant Registration Payment',
      cus_name: user?.name,
      cus_email: user?.email,
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      cus_phone: '+8801704',
      type: 'json',
    })

    return res.data
  }
}

const paymentsDb = async () => {
  const res = await premiumModel.find().populate('userId')
  return res
}
const paymentsChartDb = async () => {
  const res = await premiumModel.aggregate([
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
          status: '$paymentStatus',
          paymentCount: {
            $sum: 1,
          },
        },
      },
    },
  ])
  return res
}
export const paymentService = {
  InitializePaymentDb,
  paymentsDb,
  paymentsChartDb,
}
