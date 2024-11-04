import { ObjectId } from 'mongodb'
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
  // const { name, email } = req.body
  const user = req?.user

  console.log(user, 'auseeee')
  const response = await paymentService.InitializePaymentDb(user)

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
      amount: Number(transaction.amount),
      paymentStatus: 'paid',
      userId: new ObjectId(id as string),
    }

    console.log({ paymentDetails })
    const result = await premiumModel.create(paymentDetails)
    await result.populate('userId')
  }
  const filepath = join(__dirname, '/public/views/index.html')
  let temp = readFileSync(filepath, 'utf-8')
  temp = temp.replace('{{message}}', status as string)
  res.send('<h1>success</h1>')
})

const payments = catchAsync(async (req: Request, res: Response) => {
  const response = await paymentService.paymentsDb()
  console.log(response, 'running')

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Payment successfully done!',
    data: response,
  })
})
const paymentsChart = catchAsync(async (req: Request, res: Response) => {
  const response = await paymentService.paymentsChartDb()
  console.log(response, 'running')

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Payment successfully done!',
    data: response,
  })
})
export const paymentController = {
  InitiatePayment,
  confirmation,
  payments,
  paymentsChart,
}
