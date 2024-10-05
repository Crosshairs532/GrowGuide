import { ZodError, ZodIssue } from 'zod'

const handleZodError = (err: ZodError) => {
  return {
    success: false,
    statusCode: 200,
    sources: err.issues.map((error: ZodIssue) => {
      return {
        path: error.path[0],
        message: error.message,
      }
    }),
    message: 'Zod Validation Error',
  }
}

export default handleZodError
