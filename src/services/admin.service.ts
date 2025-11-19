import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model';

export class AdminService {
  async register(data: any) {
    const existing = await Admin.findOne({ email: data.email });
    if (existing) throw new Error('Admin already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const admin = await Admin.create({ ...data, password: hashedPassword });
    return admin;
  }

  async login(email: string, password: string) {
    console.log('🔐 Login attempt:', { email });

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log('❌ Admin not found for email:', email);
      throw new Error('Admin not found');
    }

    console.log('✅ Admin found:', { id: admin._id, email: admin.email });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log('❌ Invalid password for email:', email);
      throw new Error('Invalid credentials');
    }

    console.log('🔑 Password matched. Generating token...');

    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '1d' }
    );

    console.log('✅ Access token generated for:', email);

    return { admin, accessToken };
  }

  async getAllAdmins() {
    return Admin.find().select('-password');
  }

  async getAdminById(id: string) {
    return Admin.findById(id).select('-password');
  }

  async deleteAdmin(id: string) {
    return Admin.findByIdAndDelete(id);
  }
}
