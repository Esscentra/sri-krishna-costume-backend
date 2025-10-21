import mongoose, { Document, Schema } from 'mongoose';

export interface ICostume extends Document {
  name: string;
  description?: string;
  price: number;
  category: mongoose.Types.ObjectId; // Reference to Category
  images?: {
    url: string;
    public_id: string;
  }[];
  videos?: {
    url: string;
    public_id: string;
  }[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const costumeSchema = new Schema<ICostume>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },

    // ✅ Multiple Images (Cloudinary)
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

    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Costume = mongoose.model<ICostume>('Costume', costumeSchema);
export default Costume;
