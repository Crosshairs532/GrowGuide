import { JwtPayload } from 'jsonwebtoken'
import { TUser } from '../../modules/user-management/user.interface'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload
    }
  }
}
