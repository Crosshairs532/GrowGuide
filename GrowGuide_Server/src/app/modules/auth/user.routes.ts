import { Router } from 'express'

import { validation } from '../../middlewares/validation'
import { userValidation } from './user.validation'
import { userController } from './user.controller'

const router = Router()

router.post(
  '/register',
  validation(userValidation.RegistrationSchema),
  userController.Registration,
)

router.post(
  '/login',
  validation(userValidation.loginSchema),
  userController.Login,
)

export const authRoute = router
