import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utilities/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import configFiles from '../../config'
import { userModel } from '../modules/auth/user.model'
// * it is used when i need to verify the user.

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    console.log(token, 'access-Token')
    if (!token) {
      throw new Error('You are not Authorized!')
    }
    const decoded = jwt.verify(token, configFiles.jwt_secret as string)
    const { email, password } = decoded as JwtPayload

    //! check of the decoded user really exists?
    const isExists = await userModel.findUser(email)
    if (!isExists) {
      throw new Error('This User does not exists!')
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
