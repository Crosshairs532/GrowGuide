import axios from 'axios'
import dotenv from 'dotenv'
import configFiles from '../../config'

export const VerifyPayment = async (trnId: string) => {
  console.log(trnId, 'trnId')
  const response = await axios.get(configFiles.search_transaction!, {
    params: {
      request_id: trnId,
      store_id: configFiles.store_id,
      signature_key: configFiles.signature_key,
      type: 'json',
    },
  })

  return response.data
}
