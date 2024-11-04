import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import handleZodError from '../error/handleZodError'
import { TSources } from '../types/errorTypes'
import AppError from './AppError'
import httpStatus from 'http-status'

const globalError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.message, 'GlobalError')
  let statusCode = err.status || 500 || httpStatus.INTERNAL_SERVER_ERROR
  let errorMessage: any = err.message || 'something went wrong!'
  let sources: TSources[] = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ]

  //! zod Error
  if (err instanceof ZodError) {
    const ZodError = handleZodError(err)
    statusCode = ZodError.statusCode
    errorMessage = ZodError.message
    sources = ZodError.sources
  } else if (err instanceof Error) {
    console.log('Error')
    errorMessage = err?.message
    sources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof AppError) {
    statusCode = err?.status
    errorMessage = err.message
    sources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err.message == 'jwt expired') {
    console.log('jwt block')
    statusCode == httpStatus.UNAUTHORIZED
    errorMessage = err.message

    sources = [
      {
        path: 'TokenExpiredError',
        message: err?.message,
      },
    ]
  }
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: errorMessage,
    errorSources: sources,
  })
}

export default globalError
