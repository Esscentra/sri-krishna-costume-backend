import { z } from 'zod';

// Allowed values for transactionType
const transactionTypeEnum = z.enum(["buy", "rent", "both"]);

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

  transactionType: transactionTypeEnum,  // ✅ FIXED

  image: z
    .object({
      url: z.url('Invalid image URL').optional(), // ✅ new `.url()` method
      public_id: z.string().optional(),
    })
    .optional(),
});

// ✅ Separate schema for just updating categories (partial)
export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  transactionType: transactionTypeEnum.optional(), // ✅ FIXED
  image: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
});
// ✅ Type inference for TypeScript
export type CategoryInput = z.infer<typeof categorySchema>;
export type CategoryUpdateInput = z.infer<typeof updateCategorySchema>;
