import { join } from 'path'
import { promises as fs } from 'fs'
import { connectToDatabase } from '@/lib/db'
import Product from '@/lib/db/models/product.model'

async function verifyImages() {
  try {
    await connectToDatabase()
    
    // Get all products with their images
    const products = await Product.find({}, 'name images')
    
    // Get all image files in public/images
    const publicPath = join(process.cwd(), 'public', 'images')
    const files = await fs.readdir(publicPath)
    const imageFiles = new Set(files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    ))
    
    console.log('Verifying image references...')
    console.log(`Found ${products.length} products and ${imageFiles.size} image files`)
    
    // Check for missing images
    const missingImages = new Set<string>()
    const usedImages = new Set<string>()
    
    for (const product of products) {
      for (const imagePath of product.images) {
        const imageName = imagePath.split('/').pop()
        if (imageName && !imageFiles.has(imageName)) {
          missingImages.add(`${imageName} (referenced by ${product.name})`)
        } else if (imageName) {
          usedImages.add(imageName)
        }
      }
    }
    
    // Report results
    if (missingImages.size > 0) {
      console.log('\nMissing images:')
      Array.from(missingImages).forEach(img => console.log(`- ${img}`))
    } else {
      console.log('\nAll images are present!')
    }
    
    // Find unused images
    const unusedImages = Array.from(imageFiles).filter(
      file => !usedImages.has(file)
    )
    
    if (unusedImages.length > 0) {
      console.log('\nUnused images:')
      unusedImages.forEach(img => console.log(`- ${img}`))
    }
    
    process.exit(0)
  } catch (error) {
    console.error('Error verifying images:', error)
    process.exit(1)
  }
}

verifyImages()
