import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  file: Buffer,
  folder: string = 'bolsa-empleo',
  options: { width?: number; height?: number; public_id?: string } = {}
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: 'image',
      transformation: [
        { width: options.width || 400, height: options.height || 400, crop: 'fill', gravity: 'face' },
      ],
    }

    if (options.public_id) {
      uploadOptions.public_id = options.public_id
      uploadOptions.overwrite = true
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          })
        }
      }
    )

    uploadStream.end(file)
  })
}

export async function deleteImage(public_id: string): Promise<void> {
  await cloudinary.uploader.destroy(public_id)
}

export { cloudinary }
