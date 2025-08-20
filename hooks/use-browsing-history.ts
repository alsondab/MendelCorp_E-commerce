import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BrowsingHistory = {
  products: { id: string; category: string }[]
}

const initialState: BrowsingHistory = {
  products: [],
}

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(() => initialState, {
    name: 'browsingHistoryStore',
  })
)

export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore()
  
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      browsingHistoryStore.setState((state) => {
        const existingIndex = state.products.findIndex((p) => p.id === product.id)
        let newProducts = [...state.products]
        
        if (existingIndex !== -1) {
          // Remove existing item
          newProducts.splice(existingIndex, 1)
        }
        
        // Add new item to the beginning
        newProducts = [product, ...newProducts]
        
        // Keep only the last 10 items
        if (newProducts.length > 10) {
          newProducts = newProducts.slice(0, 10)
        }
        
        return { products: newProducts }
      })
    },

    clear: () => {
      browsingHistoryStore.setState({ products: [] })
    },
  }
}