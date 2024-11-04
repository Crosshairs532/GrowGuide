import { Request, Response } from 'express'
import { catchAsync } from '../../utilities/catchAsync'
import puppeteer from 'puppeteer'
import path from 'path'
import { sendResponse } from '../../utilities/sendResponse'
import httpStatus from 'http-status'

// const GeneratePdfController = catchAsync(
//   async (req: Request, res: Response) => {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     const pdfDir = path.join(process.cwd(), 'pdf')
//     const postData = req.body
//     const content = `
//     <html>
//       <head>
//         <style>
//         .title{
//             font-size: 30px;
//             font-weight: bold;
//             color:#1E1E1E
//         }
//           body { font-family: Arial, sans-serif; }
//           h1 { font-size: 24px; }
//           .categories { margin-top: 20px; }
//           .images img { width: 100%; height: auto; }
//         </style>
//       </head>
//       <body>
//         <h1 class="title">GrowGuide</h1>
//         <h1>Description:</h1>
//         <div>${postData.description}</div>
//         <h1 class="categories">Categories:</h1>
//         <div>${postData.categories.map((cat: any) => `<small>${cat}</small>`).join(', ')}</div>
//         <h1>Images:</h1>
//         <div class="images">${postData.images.map((img: any) => `<img src="${img}" alt="Post image" />`).join('')}</div>
//       </body>
//     </html>
//   `
//     const timestamp = Date.now()
//     const pdfFilePath = path.join(pdfDir, `example_${timestamp}.pdf`)
//     console.log(pdfFilePath)
//     await page.setContent(content)
//     const pdfBuffer = await page.pdf({ path: pdfFilePath, format: 'A4' })
//     await browser.close()

//     sendResponse(res, {
//       success: true,
//       status: httpStatus.OK,
//       message: 'Pdf generated successfully',
//       data: pdfBuffer,
//     })
//   },
// )

const GeneratePdfController = catchAsync(
  async (req: Request, res: Response) => {
    const postData = req.body
    const content = `
    <html>
      <head>
        <style>
        .title{
            font-size: 30px;
            font-weight: bold;
            color:#1E1E1E
        }
          body { font-family: Arial, sans-serif; }
          h1 { font-size: 24px; }
          .categories { margin-top: 20px; }
          .images img { width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <h1 class="title">GrowGuide</h1>
        <h1>Description:</h1>
        <div>${postData.description}</div>
        <h1 class="categories">Categories:</h1>
        <div>${postData.categories.map((cat: any) => `<small>${cat}</small>`).join(', ')}</div>
        <h1>Images:</h1>
        <div class="images">${postData.images.map((img: any) => `<img src="${img}" alt="Post image" />`).join('')}</div>
      </body>
    </html>
    `
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    // Saves the PDF to hn.pdf.
    await page.pdf({
      path: 'hn.pdf',
      format: 'A4',
    })
  },
)
export const pdfController = {
  GeneratePdfController,
}
