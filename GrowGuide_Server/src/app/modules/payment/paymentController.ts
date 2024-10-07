import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { sendResponse } from '../../utilities/sendResponse'
import httpStatus from 'http-status'
import { paymentService } from './payment.service'
import { premiumModel } from '../premium/premium.model'
import { VerifyPayment } from '../../utilities/verifyPayment'
import { join } from 'path'
import { readFileSync } from 'fs'

const InitiatePayment = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body
  const user = req.user

  console.log(user, 'auseeee')
  const response = await paymentService.InitializePaymentDb(name, email, user)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Payment successfully done!',
    data: response,
  })
})

const confirmation = catchAsync(async (req: Request, res: Response) => {
  const { transactionId, status, id } = req.query

  //! search transaction
  const transaction = await VerifyPayment(transactionId as string)
  console.log(transaction, 'search')
  if (transaction && transaction.pay_status === 'Successful') {
    const paymentDetails = {
      transactionId,
      amount: transaction.amount,
      paymentStatus: 'paid',
      userId: id,
    }
    const result = (await premiumModel.create(paymentDetails)).populate(
      'userId',
    )
  }
  const filepath = join(__dirname, '../payment/views/index.html')
  let temp = readFileSync(filepath, 'utf-8')
  temp = temp.replace('{{message}}', status as string)

  res.send('<h1>success</h1>')
})
export const paymentController = {
  InitiatePayment,
  confirmation,
}
