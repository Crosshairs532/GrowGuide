import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { allRouter } from './app/routes/routes'
import globalError from './app/middlewares/globalError'
import path from 'path'
import configFiles from './config'
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  cors({
    origin: [
      'https://grow-guide-client.vercel.app/',
      configFiles.frontend_url as string,
    ],
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('GrowGuide Server in running 🚀')
})

app.use('/api/growGuide', allRouter)

app.use(globalError)
app.use(express.static(path.join(__dirname, 'public')))
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error)

  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason)

  process.exit(1)
})

export default app
