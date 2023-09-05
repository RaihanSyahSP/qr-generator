"use client";

import { useState } from "react";
import * as htmlToImage from "html-to-image";
import { QRCode } from "react-qrcode-logo";
import { QRStyleOptions } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

export default function IndexPage() {
  const [QRValue, setQRValue] = useState("https://react.dev")
  const [QRStyle, setQRStyle] = useState<"squares" | "dots">("squares")
  const [logoWidth, setLogoWidth] = useState<number>(40)
  const [logoHeight, setLogoHeight] = useState<number>(40)
  const [imageURL, setImageURL] = useState<string>(
    "https://ionicframework.com/docs/icons/logo-react-icon.png"
  )

  const handleQRValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQRValue(e.target.value)
  }

  const handleQRLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value)
  }

  const handleQRStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQRStyle(e.target.value as "squares" | "dots")
  }

  const handleLogoHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoHeight(Number(e.target.value))
  }

  const handleLogoWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoWidth(Number(e.target.value))
  }

  const handleDownload = () => {
    htmlToImage
      .toJpeg(document.getElementById("qr-code-wrapper")!)
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = "image.jpeg"
        link.href = dataUrl
        link.click()
      })
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex flex-col items-center gap-2 text-center md:max-w-[700px]">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          QR Code Generator
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Simple Web App to generate QR Code
        </p>
      </div>
      <div className="mx-auto flex flex-col items-center gap-2 text-start md:max-w-[700px]">
        <div id="qr-code-wrapper">
            <QRCode
              id="qr-code"
              size={220}
              value={QRValue}
              qrStyle={QRStyle}
              eyeRadius={10}
              logoImage={imageURL}
              logoHeight={logoHeight}
              logoWidth={logoWidth}
              enableCORS={true}
          />
            <p className="break-word text-darkpurple-300 w-60 bg-sky-600 text-center">
              {QRValue}
            </p>
        </div>
        
        <div className="space-y-3 sm:w-[300px] md:w-[400px] ">
          <Input
            name="content"
            htmlFor="content"
            placeholder="https://github.com"
            label="Content"
            onChange={handleQRValueChange}
            value={QRValue}
          />
          <Input
            name="imageUrl"
            htmlFor="imageUrl"
            placeholder="https://github.com"
            label="Logo URL (optional)"
            onChange={handleQRLogoChange}
            value={imageURL}
          />
          <div className="flex flex-row gap-3 pt-1">
            <Input
              name="imageWidth"
              htmlFor="imageWidth"
              label="Logo Width(optional)"
              type="number"
              onChange={handleLogoWidthChange}
            />
            <Input
              name="imageHeight"
              htmlFor="imageHeight"
              label="Logo Height(optional)"
              type="number"
              onChange={handleLogoHeightChange}
            />
          </div>
          <Select
            labelName="QR Style"
            selectOptions={QRStyleOptions}
            onChange={handleQRStyleChange}
            defaultValue={QRStyle}
            labelHTMLFor="qr-style"
          />
          <Button type="submit" className="w-full" onClick={handleDownload}>Download</Button>
        </div>
      </div>
    </section>
  )
}