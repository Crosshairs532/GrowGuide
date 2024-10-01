import { Router } from 'express'
import { authRoute } from '../modules/auth/user.routes'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export const allRouter = router
