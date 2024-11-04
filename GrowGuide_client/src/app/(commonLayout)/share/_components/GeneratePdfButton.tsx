/* eslint-disable prettier/prettier */
"use client";
import AxiosInstance from "@/lib/AxiosInstance";
import { Button } from "@nextui-org/button";
import { Download } from "lucide-react";
import React from "react";
import { useGeneratePdf } from "./useGeneratePdf";
import { cleanURL } from "@/utils/cleanURL";

const GeneratePdfButton = ({ post }: { post: any }) => {
  let images: string[];
  if (post) {
    images = post?.images.map(cleanURL);
  }
  const handlePdf = async () => {
    const html2pdf = await require("html2pdf.js");
    const content = `
    <html>
      <head>
        <style>
        .title{
            font-size: 30px;
            font-weight: bold;
            color:#1E1E1E;
        }
          body { 
 
          font-family: Arial, sans-serif;
       
          }
          h1 
          { font-size: 24px; }

          .categories { margin-top: 20px; }
          .images img 
          { width: 100%; height: auto; }
           .images{
           display:grid;
           grid-template-columns: repeat(3, 1fr);
           }
           .cat{
                 color:#303030;
           }
           p{
           color:#303030;
           }
           li{
            color:#303030;
           }
           .images{
           margin: 10px  0px;
           }
           .des{
         color:#303030;
           }
        </style>
      </head>
      <body>

        <h1 class="title">GrowGuide</h1>
        <h1 class="title">Description:</h1>
        <div class="des">
        <p >
        ${post.description}
        </p>
        </div>
        <h1 class="categories title">Categories:</h1>
        <div class="cat">${post.categories.map((cat: any) => `<small>${cat}</small>`).join(", ")}</div>
        <h1 class="title">Images:</h1>
        <div class="images title">${images.map((img: any) => `<img src="${img}" alt="Post image" />`).join("")}</div>

      </body>
    </html>
    `;

    if (images) {
      html2pdf()
        .from(content)
        .set({
          margin: 1,
          filename: "post.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }

    // const res = await useGeneratePdf(post);
  };
  return (
    <div>
      <Button onClick={handlePdf} className=" bg-[#188CD8]">
        <p className=" font-chirpMedium text-[1vw]">Save offline </p>
        <Download />
      </Button>
    </div>
  );
};

export default GeneratePdfButton;
