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

router.post('/follow-user', auth(), userController.FollowUser)
router.post('/unfollow-user', auth(), userController.unfollowUser)

router.get('/users', userController.getAllUsers)
router.post('/add-to-favourites', userController.addToFav)

export const userRoute = router
