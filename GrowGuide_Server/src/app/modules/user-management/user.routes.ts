import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'

import ParseFromData from '../../middlewares/parseFromData'
import { upload } from '../../utilities/ToCloudinary'

const router = Router()
router.put(
  '/profile-update',
  upload.single('file'),
  ParseFromData,
  auth(),
  userController.profileUpdate,
)
export const userRoute = router
