import { Router } from 'express'

import { validation } from '../../middlewares/validation'
import { userValidation } from './user.validation'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'

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

router.post(
  '/change-password',
  auth(),
  validation(userValidation.changePasswordSchema),
  userController.changePassword,
)

export const authRoute = router
