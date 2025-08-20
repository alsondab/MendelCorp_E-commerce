import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'

export async function GET() {
  try {
    await connectToDatabase()
    const products = await Product.find({}).limit(3).select('name images')
    
    // Log the products to the console
    console.log('Sample products from database:', JSON.stringify(products, null, 2))
    
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
