import { NextRequest, NextResponse } from 'next/server'

import Product from '@/lib/db/models/product.model'
import { connectToDatabase } from '@/lib/db'

export const GET = async (request: NextRequest) => {
  try {
    const listType = request.nextUrl.searchParams.get('type') || 'history'
    const productIdsParam = request.nextUrl.searchParams.get('ids')
    const categoriesParam = request.nextUrl.searchParams.get('categories')

    if (!productIdsParam || !categoriesParam) {
      return NextResponse.json([])
    }

    // Filter out empty values and validate
    const productIds = productIdsParam.split(',').filter(id => id && id.trim() !== '')
    const categories = categoriesParam.split(',').filter(cat => cat && cat.trim() !== '')

    if (productIds.length === 0 || categories.length === 0) {
      return NextResponse.json([])
    }

    await connectToDatabase()
    
    const filter =
      listType === 'history'
        ? {
            _id: { $in: productIds },
            isPublished: true
          }
        : { 
            category: { $in: categories }, 
            _id: { $nin: productIds },
            isPublished: true
          }

    const products = await Product.find(filter).limit(10)
    
    if (listType === 'history') {
      // Sort by the order they appear in the browsing history
      return NextResponse.json(
        products.sort(
          (a, b) =>
            productIds.indexOf(a._id.toString()) -
            productIds.indexOf(b._id.toString())
        )
      )
    }
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error in browsing history API:', error)
    return NextResponse.json([], { status: 500 })
  }
}