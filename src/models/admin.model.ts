import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  name?: string;
}

const AdminSchema: Schema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
