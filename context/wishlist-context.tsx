'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  originalPrice?: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const addItem = useCallback((item: WishlistItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id)
      if (existingItem) return currentItems
      return [...currentItems, item]
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }, [])

  const clearWishlist = useCallback(() => {
    setItems([])
  }, [])

  const isInWishlist = useCallback((id: number) => {
    return items.some(item => item.id === id)
  }, [items])

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

