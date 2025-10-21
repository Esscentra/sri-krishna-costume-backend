import { Express } from 'express';
import Costume from '../models/costume.model';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import fs from 'fs';

export const createCostume = async (
  data: any,
  files?: Express.Multer.File[]
) => {
  let imageData: { url: string; public_id: string }[] = [];
  let videoData: { url: string; public_id: string }[] = [];

  if (files && files.length > 0) {
    for (const file of files) {
      const resourceType = file.mimetype.startsWith('video')
        ? 'video'
        : 'image';
      const uploadResult = await uploadToCloudinary(
        file.path,
        'costumes',
        resourceType
      );

      if (resourceType === 'image') {
        imageData.push({
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        });
      } else {
        videoData.push({
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        });
      }

      fs.unlinkSync(file.path);
    }
  }

  const costume = new Costume({
    ...data,
    images: imageData,
    videos: videoData,
  });
  return await costume.save();
};

export const getAllCostumes = async () => {
  return await Costume.find();
};

export const getSingleCostume = async (id: string) => {
  return await Costume.findById(id);
};

export const updateCostume = async (
  id: string,
  data: any,
  files?: Express.Multer.File[]
) => {
  const costume = await Costume.findById(id);
  if (!costume) throw new Error('Costume not found');

  // Initialize arrays if undefined
  if (!costume.images) costume.images = [];
  if (!costume.videos) costume.videos = [];

  // Upload new files if provided
  if (files && files.length > 0) {
    for (const file of files) {
      const resourceType = file.mimetype.startsWith('video')
        ? 'video'
        : 'image';
      const uploadResult = await uploadToCloudinary(
        file.path,
        'costumes',
        resourceType
      );

      if (resourceType === 'image') {
        costume.images.push({
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        });
      } else {
        costume.videos.push({
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        });
      }

      fs.unlinkSync(file.path);
    }
  }

  Object.assign(costume, data);
  return await costume.save();
};

export const deleteCostume = async (id: string) => {
  const costume = await Costume.findById(id);
  if (!costume) throw new Error('Costume not found');

  // Delete images/videos from Cloudinary safely
  for (const img of costume.images ?? []) {
    await deleteFromCloudinary(img.public_id);
  }
  for (const vid of costume.videos ?? []) {
    await deleteFromCloudinary(vid.public_id);
  }

  const deleted = await Costume.findByIdAndDelete(id);
  if (!deleted) throw new Error('Failed to delete costume');

  return deleted;
};
