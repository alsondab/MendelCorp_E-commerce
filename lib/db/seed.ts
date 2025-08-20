import data from '@/lib/data'
import { connectToDatabase } from './'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const main = async () => {
  try {
    console.log('🌱 Début du seeding...')
    
    // Vérifier que les données existent
    const { products } = data
    console.log(`📦 ${products.length} produits à insérer`)
    
    // Connexion à la base
    console.log('🔌 Connexion à MongoDB...')
    await connectToDatabase(process.env.MONGODB_URI)
    console.log('✅ Connexion réussie')
    
    // Suppression des anciens produits
    console.log('🗑️ Suppression des anciens produits...')
    const deleteResult = await Product.deleteMany({})
    console.log(`❌ ${deleteResult.deletedCount} produits supprimés`)
    
    // Insertion des nouveaux produits
    console.log('📥 Insertion des nouveaux produits...')
    const createdProducts = await Product.insertMany(products)
    console.log(`✅ ${createdProducts.length} produits créés`)
    
    // Vérification finale
    const totalCount = await Product.countDocuments()
    console.log(`📊 Total produits en base : ${totalCount}`)
    
    console.log('🎉 Base de données ensemencée avec succès !')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Erreur lors du seeding:')
    console.error(error)
    process.exit(1)
  }
}

// Appel de la fonction avec gestion d'erreur
main().catch((error) => {
  console.error('💥 Erreur fatale:', error)
  process.exit(1)
})