import { Router } from 'express'
import { upload } from '../../utilities/ToCloudinary'
import ParseFromData from '../../middlewares/parseFromData'
import { validation } from '../../middlewares/validation'
import auth from '../../middlewares/auth'
import { authController } from './auth.controller'
import { authValidation } from './auth.validation'

const router = Router()

router.post(
  '/register',
  upload.single('file'),
  ParseFromData,
  validation(authValidation.RegistrationSchema),
  authController.Registration,
)

router.post(
  '/login',
  validation(authValidation.loginSchema),
  authController.Login,
)

router.post(
  '/change-password',
  auth(),
  validation(authValidation.changePasswordSchema),
  authController.changePassword,
)
router.post(
  '/reset-password',
  auth(),
  validation(authValidation.resetPasswordSchema),
  authController.resetPassword,
)
router.post(
  '/forget-password',
  auth(),
  // validation(authValidation.resetPasswordSchema),
  authController.forgetPassword,
)

export const authRoute = router
