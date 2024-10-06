import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { upload } from '../../utilities/ToCloudinary'
import ParseFromData from '../../middlewares/parseFromData'

const router = Router()
router.put(
  '/profile-update',
  upload.single('file'),
  ParseFromData,
  auth(),
  userController.profileUpdate,
)
export const userRoute = router
