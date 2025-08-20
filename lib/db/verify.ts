import { connectToDatabase } from './'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const verifyDatabase = async () => {
  try {
    console.log('🔍 Vérification de la base de données...')
    
    // Connexion
    await connectToDatabase(process.env.MONGODB_URI)
    console.log('✅ Connexion MongoDB réussie')
    
    // Comptage total
    const totalProducts = await Product.countDocuments()
    console.log(`📊 Total produits en base: ${totalProducts}`)
    
    if (totalProducts === 0) {
      console.log('⚠️  Aucun produit trouvé. Le seeding a peut-être échoué.')
      return
    }
    
    // Quelques exemples de produits
    console.log('\n📝 Exemples de produits:')
    const sampleProducts = await Product.find({}).limit(3).select('name price category')
    
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.price}€ (${product.category})`)
    })
    
    // Statistiques par catégorie
    console.log('\n📈 Répartition par catégorie:')
    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    categoryStats.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count} produits`)
    })
    
    console.log('\n✅ Vérification terminée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:')
    console.error(error)
    process.exit(1)
  }
}

verifyDatabase()