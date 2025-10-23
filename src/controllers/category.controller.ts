import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/response';
import {
  categorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';
import * as CategoryService from '../services/category.service';

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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id; // ✅ only the ID string
    const data = await CategoryService.getCategoryById(categoryId);
    return successResponse(res, 'Category fetched successfully', data);
  } catch (error) {
    return errorResponse(res, error);
  }
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
