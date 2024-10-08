import { Router } from 'express'
import { authRoute } from '../modules/auth/auth.routes'
import { userRoute } from '../modules/user-management/user.routes'
import { paymentRoute } from '../modules/payment/payment.routes'
import { postRoute } from '../modules/post/post.route'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user-management',
    route: userRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export const allRouter = router
