import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import handleZodError from '../error/handleZodError'
import { TSources } from '../types/errorTypes'
import AppError from './AppError'

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err, 'GlobalError')
  let statusCode = err.status || 500
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
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: errorMessage,
    errorSources: sources,
  })
}

export default globalError
