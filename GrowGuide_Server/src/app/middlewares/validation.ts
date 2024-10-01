import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodObject } from 'zod'
import { catchAsync } from '../utilities/catchAsync'

export const validation = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body)
    next()
  })
}
