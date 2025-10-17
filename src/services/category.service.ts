import Category from '../models/category.model';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import fs from 'fs';

export const createCategory = async (data: any, file?: Express.Multer.File) => {
  let imageData;

  if (file) {
    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
    const uploadResult = await uploadToCloudinary(
      file.path,
      'categories',
      resourceType
    );
    imageData = {
      url: uploadResult.url,
      public_id: uploadResult.public_id,
    };

    // remove local file
    fs.unlinkSync(file.path);
  }

  const category = new Category({
    ...data,
    image: imageData,
  });

  return await category.save();
};

export const getAllCategories = async () => {
  return await Category.find().sort({
    createdAt: -1,
  });
};

export const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

export const updateCategory = async (
  id: string,
  data: any,
  file?: Express.Multer.File
) => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');

  // If new file uploaded, replace old image
  if (file) {
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }

    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';
    const uploadResult = await uploadToCloudinary(
      file.path,
      'categories',
      resourceType
    );
    data.image = {
      url: uploadResult.url,
      public_id: uploadResult.public_id,
    };

    fs.unlinkSync(file.path);
  }

  Object.assign(category, data);
  return await category.save();
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');

  if (category.image?.public_id) {
    await deleteFromCloudinary(category.image.public_id);
  }

  await category.deleteOne();
  return { message: 'Category deleted successfully' };
};
