import { Router } from 'express'
import { postController } from './post.controller'
import postFromData from './postfromData'
import { upload } from '../../utilities/ToCloudinary'
import postFormData from '../../middlewares/parsePostFormData'
import parsePostFromData from '../../middlewares/parsePostFormData'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/create-post',
  upload.array('file'),
  postFromData,
  postController.createPost,
)

router.put('/create-comment', postController.createComment)

router.patch('/vote', postController.UpDownVote)

router.get('/posts', postController.getAllPosts)

router.delete(
  '/post-delete',
  auth(['user', 'admin']),
  postController.postDelete,
)
router.put('/comments', postController.postComment)

router.patch(
  '/post-update',
  upload.array('file'),
  parsePostFromData,
  postController.postUpdate,
)
router.post('/')
// ! get logged in user posts
router.get('/get-user-posts', postController.getLoggedInUserPost)

router.get('/posts-charts', postController.postChart)

router.get('/posts/:postId', postController.getSinglePostController)

export const postRoute = router
