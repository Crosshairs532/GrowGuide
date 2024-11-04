import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utilities/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import configFiles from '../../config'
import { userModel } from '../modules/user-management/user.model'
import AppError from './AppError'
import httpStatus from 'http-status'
// * it is used when i need to verify the user.

const auth = (roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    console.log(token, 'access-Token')

    if (!token) {
      throw new Error('You are not Authorized!')
    }

    console.log('ashche??? ')
    const decoded = jwt.verify(token, configFiles.jwt_secret as string)

    if (!decoded) {
      console.log('ashche??? ')
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized!')
    }
    const { email, password, role } = decoded as JwtPayload

    console.log({ email, role, roles })

    //! check of the decoded user really exists?
    const isExists = await userModel.findUser(email)
    console.log(isExists, '<<=')
    if (!isExists) {
      throw new Error('This User does not exists!')
    }

    if (!(email === isExists?.email)) {
      throw new Error('This User does not authorized')
    }

    const basedOneRoles = roles?.some(roleBase => roleBase === role)
    console.log({ basedOneRoles, role })
    if (!basedOneRoles) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this route',
      )
    }
    req.user = isExists
    next()
  })
}

export default auth
