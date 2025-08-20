import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'

export async function GET() {
  try {
    await connectToDatabase()
    const categories = await Product.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', image: { $first: { $arrayElemAt: ['$images', 0] } } } },
      { $project: { name: '$_id', image: 1, _id: 0 } }
    ])
    
    return NextResponse.json({ success: true, categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
