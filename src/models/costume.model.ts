import mongoose, { Document, Schema } from 'mongoose';

interface IMedia {
  url: string;
  public_id: string;
  type: 'image' | 'video';
}

export interface ICostume extends Document {
  name: string;
  description?: string;
  category: mongoose.Schema.Types.ObjectId;
  price: number;
  availableSizes: string[];
  stock: number;
  images: IMedia[];
  videos: IMedia[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
  },
  { _id: false }
);

const costumeSchema = new Schema<ICostume>(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    availableSizes: [{ type: String }],
    stock: { type: Number, default: 0 },
    images: [mediaSchema],
    videos: [mediaSchema],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Costume = mongoose.model<ICostume>('Costume', costumeSchema);
export default Costume;
