import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utilities/catchAsync'
import { sendImageToCloudinary } from '../utilities/ToCloudinary'

const ParseFromData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { image, ...other } = JSON.parse(req.body.data)

    console.log(req)
    if (req?.file?.path) {
      // ! cloudinary
      const path = req.file!.path
      console.log({ path })
      const { secure_url } = (await sendImageToCloudinary(
        other.name,
        path,
      )) as any
      console.log(!!secure_url)
      req.body = { image: secure_url, ...other }
    } else {
      req.body = { ...other }
    }

    next()
  },
)

export default ParseFromData
