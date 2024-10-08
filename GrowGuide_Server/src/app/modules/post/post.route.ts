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

router.put('/create-comment', postController.createComment)

router.patch('/vote', postController.UpDownVote)
export const postRoute = router
