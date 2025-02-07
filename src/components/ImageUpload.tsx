"use client"

import { toast } from "@/hooks/use-toast"
import config from "@/lib/config"
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next"
import Image from "next/image"
import { useRef, useState } from "react"

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status}: ${errorText} `,
      )
    }

    const data = await response.json()
    const { signature, expire, token } = data

    return { token, signature, expire }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Authenticator request failed " + error.message)
    } else {
      throw new Error("Authenticator request failed")
    }
  }
}

const ImageUpload = ({
  id,
  onFileChange,
}: {
  id: string
  onFileChange: (filePath: string) => void
}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  const onError = () => {
    toast({
      title: "Image upload failed",
      description: "Your image could not be uploaded. Please try again.",
      variant: "destructive",
    })
  }
  const onSuccess = (res: { filePath: string }) => {
    // if (typeof res === 'object' && res !== null) {
    setFile(res)
    onFileChange(res.filePath)
    // }
    toast({
      title: "Image Uploaded Successfully",
      description: `${res.filePath} uploaded successfully`,
    })
  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        id={id}
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        onLoad={() => console.log("loaded")}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault()
          if (ikUploadRef.current) {
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="size-5 object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
