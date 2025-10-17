import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
