import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (
  filePath: string,
  folder: string,
  resourceType: 'image' | 'video' = 'image'
) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: resourceType,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
    type: resourceType,
  };
};

export const deleteFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
};

export default cloudinary;
