import dotenv from 'dotenv'
import path from 'path'

const configPath = dotenv.config({ path: path.join(process.cwd(), '.env') })
console.log(configPath)

const configFiles = {
  DB_URL: process.env.DB_URI,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  sender_email: process.env.SENDER_EMAIL,
  sender_password: process.env.SENDER_PASSWORD,
  base_url: process.env.BASE_URL,
}

export default configFiles
