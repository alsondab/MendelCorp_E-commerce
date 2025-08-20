import { z } from 'zod'
import { formatNumberWithDecimal } from './utils'

// Common
const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ID' })

const Price = (field: string) =>
  z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
      `${field} doit avoir exactement deux décimales (ex: 49,99)`
    )


export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  slug: z.string().min(3, 'Le slug doit contenir au moins 3 caractères'),
  category: z.string().min(1, 'La catégorie est obligatoire'),
  images: z.array(z.string()).min(1, 'Le produit doit avoir au moins une image'),
  brand: z.string().min(1, 'La marque est obligatoire'),
  description: z.string().min(1, 'La description est obligatoire'),
  isPublished: z.boolean(),
  price: Price('Price'),
  listPrice: Price('List price'),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative('Le stock disponible doit être un nombre non négatif'),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, 'La note moyenne doit être au minimum de 0')
    .max(5, 'La note moyenne doit être au maximum de 5'),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative('Le nombre d\'avis doit être un nombre non négatif'),
  ratingDistribution: z
    .array(z.object({ rating: z.number(), count: z.number() }))
    .max(5),
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative('Le nombre de ventes doit être un nombre non négatif'),
})