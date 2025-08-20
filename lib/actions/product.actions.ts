'use server'

import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'
import { IProduct } from '@/lib/db/models/product.model'
import { PAGE_SIZE } from '@/lib/constants'

// CodeGen: Refactor | Explain | Generate JSDoc | X
export async function getAllCategories() {
  await connectToDatabase()
  const categories = await Product.aggregate([
    { $match: { isPublished: true } },
    { $group: { _id: '$category', image: { $first: { $arrayElemAt: ['$images', 0] } } } },
    { $project: { name: '$_id', image: 1, _id: 0 } }
  ])
  return categories
}

// CodeGen: Refactor | Explain | Generate JSDoc | X
export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  const products = await Product.aggregate([
    { $match: { tags: { $in: [tag] }, isPublished: true } },
    {
      $project: {
        name: 1,
        href: { $concat: ['/product/', '$slug'] },
        image: { $arrayElemAt: ['$images', 0] },
      }
    }
  ])
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// Nouvelle fonction pour récupérer des produits récents
export async function getRecentProducts(limit = 4) {
  await connectToDatabase()
  const products = await Product.aggregate([
    { $match: { isPublished: true } },
    {
      $project: {
        name: 1,
        href: { $concat: ['/product/', '$slug'] },
        image: { $arrayElemAt: ['$images', 0] },
      }
    }
  ])
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// Nouvelle fonction pour récupérer des produits populaires (par nombre de ventes)
export async function getPopularProducts(limit = 4) {
  await connectToDatabase()
  const products = await Product.aggregate([
    { $match: { isPublished: true } },
    {
      $project: {
        name: 1,
        href: { $concat: ['/product/', '$slug'] },
        image: { $arrayElemAt: ['$images', 0] },
      }
    }
  ])
    .sort({ numSales: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// Nouvelle fonction pour récupérer des produits avec des tags populaires
export async function getProductsByPopularTags(limit = 4) {
  await connectToDatabase()
  const products = await Product.aggregate([
    { $match: { isPublished: true } },
    {
      $project: {
        name: 1,
        href: { $concat: ['/product/', '$slug'] },
        image: { $arrayElemAt: ['$images', 0] },
      }
    }
  ])
    .sort({ avgRating: 'desc', numReviews: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// GET PRODUCTS BY TAG
export async function getProductsByTag({
  tag,
  limit = 10,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  const products = await Product.find({
    tags: { $in: [tag] },
    isPublished: true,
  })
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as IProduct[]
}

// GET DEAL PRODUCTS (products with discounts)
export async function getDealProducts(limit = 10) {
  await connectToDatabase()
  const products = await Product.find({
    isPublished: true,
    listPrice: { $gt: 0 },
    $expr: { $lt: ['$price', '$listPrice'] }
  })
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as IProduct[]
}

   // GET ONE PRODUCT BY SLUG
   export async function getProductBySlug(slug: string) {
    await connectToDatabase()
    const product = await Product.findOne({ slug, isPublished: true })
    if (!product) throw new Error('Product not found')
    return JSON.parse(JSON.stringify(product)) as IProduct
  }
  // GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
  export async function getRelatedProductsByCategory({
    category,
    productId,
    limit = PAGE_SIZE,
    page = 1,
  }: {
    category: string
    productId: string
    limit?: number
    page: number
  }) {
    await connectToDatabase()
    const skipAmount = (Number(page) - 1) * limit
    const conditions = {
      isPublished: true,
      category,
      _id: { $ne: productId },
    }
    const products = await Product.find(conditions)
      .sort({ numSales: 'desc' })
      .skip(skipAmount)
      .limit(limit)
    const productsCount = await Product.countDocuments(conditions)
    return {
      data: JSON.parse(JSON.stringify(products)) as IProduct[],
      totalPages: Math.ceil(productsCount / limit),
    }
  }