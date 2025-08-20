import mongoose from 'mongoose'

const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')

  // Configuration avec timeout plus élevé
  const options = {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000, // 30 secondes
    socketTimeoutMS: 45000, // 45 secondes
    family: 4 // Force IPv4
  }

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, options)

  try {
    cached.conn = await cached.promise
    console.log('✅ Connexion MongoDB réussie')
    return cached.conn
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error)
    cached.promise = null // Reset pour permettre une nouvelle tentative
    throw error
  }
}