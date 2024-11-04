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
  auth(['user', 'admin']),
  userController.profileUpdate,
)

router.post('/follow-user', auth(['user', 'admin']), userController.FollowUser)
router.post(
  '/unfollow-user',
  auth(['user', 'admin']),
  userController.unfollowUser,
)

router.get('/users', userController.getAllUsers)
router.post('/add-to-favourites', userController.addToFav)
router.post('/remove-favourites', userController.removeFav)
router.get('/user', userController.getSingleUser)

router.delete('/delete-user', auth(['admin']), userController.adminDeleteUser)

export const userRoute = router
