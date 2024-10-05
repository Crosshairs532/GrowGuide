import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { allRouter } from './app/routes/routes'

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('GrowGuide Server in running 🚀')
})

app.use('/api/growGuide/', allRouter)

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error)

  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason)

  process.exit(1)
})

export default app
