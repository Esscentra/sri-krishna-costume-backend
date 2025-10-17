import { z } from 'zod';

// ✅ Zod schema for Category creation/update
export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters long')
    .max(100, 'Category name must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be under 500 characters')
    .optional(),
  image: z
    .object({
      url: z.url('Invalid image URL').optional(), // ✅ new `.url()` method
      public_id: z.string().optional(),
    })
    .optional(),
});

// ✅ Separate schema for just updating categories (partial)
export const updateCategorySchema = categorySchema.partial();

// ✅ Type inference for TypeScript
export type CategoryInput = z.infer<typeof categorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;
