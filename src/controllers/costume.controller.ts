import { Express } from 'express';
import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/response';
import { costumeSchema, updateCostumeSchema } from '../schemas/costume.schemas';
import * as CostumeService from '../services/costume.service';

export const createCostume = async (req: Request, res: Response) => {
  try {
    const parsedData = costumeSchema.parse(req.body);
    const files = req.files as Express.Multer.File[] | undefined;
    const costume = await CostumeService.createCostume(parsedData, files);
    return successResponse(res, 'Costume Created Successfully', costume);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAllCostumes = async (_req: Request, res: Response) => {
  try {
    const costumes = await CostumeService.getAllCostumes();
    return successResponse(res, 'Costumes fetched successfully', costumes);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getSingleCostume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const costume = await CostumeService.getSingleCostume(id);

    return successResponse(res, 'Costume fetched successfully', costume);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateCostume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = updateCostumeSchema.parse(req.body);
    const files = req.files as Express.Multer.File[] | undefined;
    const updatedCostume = await CostumeService.updateCostume(
      id,
      parsedData,
      files
    );
    return successResponse(res, 'Costume updated successfully', updatedCostume);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteCostume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCostume = await CostumeService.deleteCostume(id);
    if (!deletedCostume) throw new Error('Costume not found');
    return successResponse(res, 'Costume deleted successfully', deletedCostume);
  } catch (error: any) {
    return errorResponse(res, error, 400);
  }
};
