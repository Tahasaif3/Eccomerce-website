'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  weight: number 
  color?: string;
  size?:string;

}

interface CartState {
  items: CartItem[]
  total: number
  totalWeight: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
} | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.payload.quantity
        return {
          ...state,
          items: updatedItems,
          total: state.total + (action.payload.price * action.payload.quantity),
          totalWeight: state.totalWeight + (action.payload.weight * action.payload.quantity)
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.price * action.payload.quantity),
        totalWeight: state.totalWeight + (action.payload.weight * action.payload.quantity)
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload)
      if (!itemToRemove) return state
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        totalWeight: state.totalWeight - (itemToRemove.weight * itemToRemove.quantity)
      }
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const quantityDiff = action.payload.quantity - item.quantity
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })
      const updatedTotal = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      const updatedTotalWeight = updatedItems.reduce((total, item) => total + (item.weight * item.quantity), 0)
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
        totalWeight: updatedTotalWeight
      }
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        totalWeight: 0
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    totalWeight: 0
  })

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 }
    })
  }

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

