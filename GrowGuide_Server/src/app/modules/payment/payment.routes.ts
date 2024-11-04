import { Router } from 'express'
import { paymentController } from './paymentController'
import auth from '../../middlewares/auth'

const router = Router()

router.post('', auth(['user', 'admin']), paymentController.InitiatePayment)
router.post('/premium', paymentController.confirmation)

router.get('/payment-history', auth(['admin']), paymentController.payments)
router.get(
  '/payment-history/chart',
  auth(['admin']),
  paymentController.paymentsChart,
)

export const paymentRoute = router
