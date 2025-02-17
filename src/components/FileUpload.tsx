"use client"

import { toast } from "@/hooks/use-toast"
import config from "@/lib/config"
import { cn } from "@/lib/utils"
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next"
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

interface FileUploadProps {
  id: string
  type: "image" | "video"
  accept: string
  placeHolder: string
  folder: string
  variant: "dark" | "light"
  onFileChange: (filePath: string) => void
}

const FileUpload = ({
  id,
  type,
  accept,
  placeHolder,
  folder,
  variant,
  onFileChange,
}: FileUploadProps) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  const [progress, setprogress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-300 border-grey-100 border",
    placeHolder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  }

  const onError = () => {
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: "destructive",
    })
  }

  const onSuccess = (res: { filePath: string }) => {
    setUploadSuccess(true)
    setFile(res)
    onFileChange(res.filePath)
    toast({
      title: `${type} Uploaded Successfully`,
      description: `${res.filePath} uploaded successfully`,
    })
  }

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        })

        return false
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        })

        return false
      }
    }

    return true
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        id={id}
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setprogress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100)

          setprogress(percent)
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
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
        <p className={cn("text-base", styles.placeHolder)}>{placeHolder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && !uploadSuccess && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  )
}

export default FileUpload
