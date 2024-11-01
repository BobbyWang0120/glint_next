/**
 * Cloudinary配置和工具函数
 */
import { v2 as cloudinary } from 'cloudinary'

// 配置Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

/**
 * 上传图片到Cloudinary
 */
export async function uploadImage(file: Buffer): Promise<string> {
  try {
    // 将文件转换为base64
    const base64Data = file.toString('base64')
    const dataURI = `data:image/jpeg;base64,${base64Data}`

    // 上传到Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'glint/avatars',
      transformation: [
        { width: 200, height: 200, crop: 'fill' },
        { quality: 'auto' }
      ]
    })

    return result.secure_url
  } catch (error) {
    console.error('上传图片失败:', error)
    throw new Error('Failed to upload image')
  }
}
