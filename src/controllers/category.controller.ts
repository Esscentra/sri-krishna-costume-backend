import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/response';
import {
  categorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';
import * as CategoryService from '../services/category.service';
import Category from '../models/category.model';
import Costume from '../models/costume.model';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const parsedData = categorySchema.parse(req.body);
    const file = req.file;

    const category = await CategoryService.createCategory(parsedData, file);
    return successResponse(res, 'Category Created Successfully', category);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return successResponse(res, 'Categories fetched Sucessfully', categories);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getCategoryById = async (id: string) => {
  // 1. Get category details
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');

  // 2. Get all costumes related to this category
  const costumes = await Costume.find({ category: id });

  return { category, costumes }; // ✅ returning both together
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const parsedData = updateCategorySchema.parse(req.body);
    const file = req.file;

    const category = await CategoryService.updateCategory(
      req.params.id,
      parsedData,
      file
    );

    return successResponse(res, 'Category updated successfully', category);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.deleteCategory(req.params.id);
    return successResponse(res, result.message);
  } catch (error) {
    return errorResponse(res, error);
  }
};
