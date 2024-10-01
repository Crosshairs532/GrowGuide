import { Response } from 'express'

export const sendResponse = (res: Response, result: any) => {
  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data,
  })
}
