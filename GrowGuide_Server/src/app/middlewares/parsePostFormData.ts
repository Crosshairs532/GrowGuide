import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utilities/catchAsync'
import { sendImageToCloudinary } from '../utilities/ToCloudinary'
import { userModel } from '../modules/user-management/user.model'

const parsePostFormData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { images: formImages, post, ...other } = JSON.parse(req.body.data)
    const pData = JSON.parse(req.body.data)
    console.log(pData)

    // const user = await userModel.findById(post?.user?._id)
    // // ! array of images with location on the local file
    const path = (req?.files as any)?.map((file: any) => file.path)

    let images: string[] = [...formImages]

    if (path.length > 0) {
      for await (let element of path) {
        const { secure_url } = (await sendImageToCloudinary(
          post?.user!.name,
          element,
        )) as any

        console.log(secure_url)
        images.push(secure_url)
      }
    }

    console.log(images, 'images in cc ')

    const parsedData = { images: images, ...other, post }

    console.log({ parsedData })

    req.body = parsedData
    next()
  },
)

export default parsePostFormData
