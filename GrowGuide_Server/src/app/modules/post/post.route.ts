import { Router } from 'express'
import { postController } from './post.controller'
import postFromData from './postfromData'
import { upload } from '../../utilities/ToCloudinary'

const router = Router()

router.post(
  '/create-post',
  upload.array('file'),
  postFromData,
  postController.createPost,
)
export const postRoute = router
