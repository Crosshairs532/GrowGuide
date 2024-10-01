// write codes to run server
import mongoose from 'mongoose'
import configFiles from './config'
import app from './app'
import { Server } from 'http'
let server: Server
const DBConnect = async () => {
  try {
    console.log(configFiles.DB_URL)
    await mongoose.connect(configFiles.DB_URL as string)

    server = app.listen(2000, () => {
      console.log(`GrowGuide is listening on port ${2000} 🚀`)
    })
  } catch (error) {
    console.log('something went wrong with the server! ❌', error)
  }
}

DBConnect()
