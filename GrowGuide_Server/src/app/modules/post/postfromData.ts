import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import { sendImageToCloudinary } from '../../utilities/ToCloudinary'
import { userModel } from '../user-management/user.model'

const postFromData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    const formData = JSON.parse(req.body.data)

    console.log(formData)

    // !find the user
    const user = await userModel.findById(formData.user)

    // ! array of images with location on the local file
    const path = (req.files as any)?.map((file: any) => file.path)

    let images: string[] = []
    for await (let element of path) {
      const { secure_url } = (await sendImageToCloudinary(
        user!.name,
        element,
      )) as any
      images.push(secure_url)
    }

    req.body = { images: images, ...formData }

    next()
  },
)

export default postFromData
