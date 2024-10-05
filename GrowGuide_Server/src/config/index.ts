import dotenv from 'dotenv'
import path from 'path'

const configPath = dotenv.config({ path: path.join(process.cwd(), '.env') })
console.log(configPath)

const configFiles = {
  DB_URL: process.env.DB_URI,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
}

export default configFiles
