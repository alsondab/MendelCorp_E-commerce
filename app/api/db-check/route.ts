import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'

export async function GET() {
  try {
    await connectToDatabase()
    
    // Get sample products with their images
    const products = await Product.find({}, 'name images')
      .limit(3)
      .lean()
    
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Database check failed:', error)
    return NextResponse.json(
      { success: false, error: 'Database check failed' },
      { status: 500 }
    )
  }
}
