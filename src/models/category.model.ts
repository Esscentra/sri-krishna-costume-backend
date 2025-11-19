import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: {
    url: string;
    public_id: string;
  };
  transactionType: 'buy' | 'rent' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    transactionType: {
      type: String,
      enum: ['buy', 'rent', 'both'],
      required: true,
      default: 'buy',
    },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
