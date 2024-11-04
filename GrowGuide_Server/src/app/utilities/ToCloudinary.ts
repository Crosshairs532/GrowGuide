import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import configFiles from '../../config'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: configFiles.cloud_name,
  api_key: configFiles.api_key,
  api_secret: configFiles.api_secret,
})

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (error: any, Result: any) {
        if (error) {
          reject(error)
        }
        resolve(Result)
        fs.unlink(path, err => {
          if (err) {
            reject(err)
          } else {
            console.log('file deleted')
          }
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(process.cwd(), 'uploads')
    console.log(process.cwd())
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
