import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utilities/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import configFiles from '../../config'
import { userModel } from '../modules/user-management/user.model'
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

    console.log({ email })

    //! check of the decoded user really exists?
    const isExists = await userModel.findUser(email)
    console.log(isExists, '<<=')
    if (!isExists) {
      throw new Error('This User does not exists!')
    }

    if (!(email === isExists.email)) {
      throw new Error('This User does not authorized')
    }
    req.user = isExists
    next()
  })
}

export default auth
