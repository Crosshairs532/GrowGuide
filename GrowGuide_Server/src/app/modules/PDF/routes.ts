import { Router } from 'express'
import { pdfController } from './pdf.controller'

const router = Router()

router.post('/pdf', pdfController.GeneratePdfController)

export const pdfRouter = router
