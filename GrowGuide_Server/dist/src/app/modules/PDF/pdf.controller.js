"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfController = void 0;
const catchAsync_1 = require("../../utilities/catchAsync");
const puppeteer_1 = __importDefault(require("puppeteer"));
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
const GeneratePdfController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = req.body;
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
        <div>${postData.categories.map((cat) => `<small>${cat}</small>`).join(', ')}</div>
        <h1>Images:</h1>
        <div class="images">${postData.images.map((img) => `<img src="${img}" alt="Post image" />`).join('')}</div>
      </body>
    </html>
    `;
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    // Saves the PDF to hn.pdf.
    yield page.pdf({
        path: 'hn.pdf',
        format: 'A4',
    });
}));
exports.pdfController = {
    GeneratePdfController,
};
