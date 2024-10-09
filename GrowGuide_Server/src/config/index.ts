import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const configFiles = {
  DB_URL: process.env.DB_URI,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  sender_email: process.env.SENDER_EMAIL,
  sender_password: process.env.SENDER_PASSWORD,
  base_url: process.env.BASE_URL,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  search_transaction: process.env.SEARCH_TRANSACTION,
  frontend_url: process.env.FRONTEND_URL,
}

export default configFiles
