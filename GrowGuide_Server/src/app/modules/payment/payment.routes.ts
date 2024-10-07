import { Router } from 'express'
import { paymentController } from './paymentController'
import auth from '../../middlewares/auth'

const router = Router()

router.post('', auth(), paymentController.InitiatePayment)
router.post('/premium', paymentController.confirmation)

export const paymentRoute = router
