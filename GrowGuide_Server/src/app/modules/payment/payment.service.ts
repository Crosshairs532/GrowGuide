import axios from 'axios'
import configFiles from '../../../config'
import { generate_transaction_id } from '../../utilities/GenerateTranId'

const InitializePaymentDb = async (name: string, email: string, user: any) => {
  const transactionID = generate_transaction_id(name)

  if (transactionID) {
    const res = await axios.post(configFiles.payment_url!, {
      store_id: 'aamarpaytest',
      tran_id: transactionID,
      success_url: `http://localhost:2000/api/GrowGuide/payment/premium?id=${user._id}&transactionId=${transactionID}&status=success`,
      fail_url: `http://localhost:2000/api/GrowGuide/payment/premium?transactionId=${transactionID}&status=Failed`,
      cancel_url: 'http://localhost:3000/',
      amount: '100.00',
      currency: 'BDT',
      signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
      desc: 'Merchant Registration Payment',
      cus_name: name,
      cus_email: email,
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

export const paymentService = {
  InitializePaymentDb,
}
