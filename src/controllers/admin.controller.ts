import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { registerAdminSchema, loginAdminSchema } from '../schemas/admin.schema';
import { successResponse, errorResponse } from '../utils/response';

const adminService = new AdminService();

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = registerAdminSchema.parse(req.body);
    const admin = await adminService.register(validatedData);
    return successResponse(res, 'Admin registered successfully', admin);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = loginAdminSchema.parse(req.body);
    const { admin, accessToken } = await adminService.login(
      validatedData.email,
      validatedData.password
    );
    return successResponse(res, 'Login successful', { admin, accessToken });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await adminService.getAllAdmins();
    return successResponse(res, 'Admins fetched successfully', admins);
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await adminService.deleteAdmin(id);
    return successResponse(res, 'Admin deleted successfully');
  } catch (error) {
    return errorResponse(res, error);
  }
};
