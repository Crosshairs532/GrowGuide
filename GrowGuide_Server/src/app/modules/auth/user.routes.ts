import { Router } from 'express'

import { validation } from '../../middlewares/validation'
import { userValidation } from './user.validation'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { upload } from '../../utilities/ToCloudinary'
import ParseFromData from '../../middlewares/parse'

const router = Router()

router.post(
  '/register',
  upload.single('file'),
  ParseFromData,
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
router.post(
  '/reset-password',
  auth(),
  validation(userValidation.resetPasswordSchema),
  userController.resetPassword,
)
router.post(
  '/forget-password',
  auth(),
  // validation(userValidation.resetPasswordSchema),
  userController.forgetPassword,
)

export const authRoute = router
