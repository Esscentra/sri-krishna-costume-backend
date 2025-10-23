import { z } from 'zod';

export const costumeSchema = z.object({
  name: z
    .string()
    .min(2, 'Costume name must be at least 2 characters long')
    .max(100, 'Costume name must be less than 100 characters'),

  description: z
    .string()
    .max(1000, 'Description must be under 1000 characters')
    .optional(),

  price: z.preprocess((val) => {
    if (typeof val === 'string') return parseFloat(val);
    if (typeof val === 'number') return val;
    return undefined;
  }, z.number().min(1, 'Price must be at least ₹1')),

  category: z.string().min(1, 'Category ID is required'),

  stock: z.preprocess((val) => {
    if (typeof val === 'string') return parseInt(val);
    if (typeof val === 'number') return val;
    return 1; // default
  }, z.number().min(0, 'Stock cannot be negative')),

  // ✅ Required size field with ENUM validation
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'], {
    message: 'Size must be one of XS, S, M, L, XL, XXL',
  }),

  images: z
    .array(
      z.object({
        url: z.string().url('Invalid image URL'),
        public_id: z.string(),
      })
    )
    .optional(),

  videos: z
    .array(
      z.object({
        url: z.string().url('Invalid video URL'),
        public_id: z.string(),
      })
    )
    .optional(),
});

// ✅ Partial schema for updates
export const updateCostumeSchema = costumeSchema.partial();

// ✅ Types
export type CostumeInput = z.infer<typeof costumeSchema>;
export type CostumeUpdateInput = z.infer<typeof updateCostumeSchema>;
