'use client'

import { useEffect, useRef } from 'react'
import useBrowsingHistory from '@/hooks/use-browsing-history'

interface AddToBrowsingHistoryProps {
  productId: string
  category: string
}

export default function AddToBrowsingHistory({ productId, category }: AddToBrowsingHistoryProps) {
  const { addItem } = useBrowsingHistory()
  const hasAdded = useRef(false)

  useEffect(() => {
    // Only add to browsing history once per component mount
    if (!hasAdded.current) {
      addItem({ id: productId, category })
      hasAdded.current = true
    }
  }, [productId, category, addItem])

  // This component doesn't render anything visible
  return null
}
