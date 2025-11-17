import mongoose, { Document, Schema } from 'mongoose';

export interface ICostume extends Document {
  name: string;
  description?: string;
  price: number;
  category: mongoose.Types.ObjectId;
  images?: { url: string; public_id: string }[];
  videos?: { url: string; public_id: string }[];
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'; // ✅ ADDED HERE
  stock: number;
  transactionType: 'buy' | 'rent' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

const costumeSchema = new Schema<ICostume>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },

    images: {
      type: [
        {
          url: { type: String, required: true },
          public_id: { type: String, required: true },
        },
      ],
      default: [],
    },

    videos: {
      type: [
        {
          url: { type: String, required: true },
          public_id: { type: String, required: true },
        },
      ],
      default: [],
    },

    // ✅ Size ENUM (safe + prevents invalid data)
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      required: true,
    },

    stock: { type: Number, default: 1 },
    transactionType: {
      type: String,
      enum: ['buy', 'rent', 'both'],
      required: true,
      default: 'buy',
    },
  },
  { timestamps: true }
);

const Costume = mongoose.model<ICostume>('Costume', costumeSchema);
export default Costume;
