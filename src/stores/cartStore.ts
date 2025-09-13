import { defineStore } from 'pinia'

export type CartItem = { name: string; measure?: string; qty: number }

const STORAGE_KEY = 'cart-state'
const EXPIRATION_MS = 1000 * 60 * 60 * 24

function hasExpired(timestamp: number): boolean {
  return Date.now() - timestamp > EXPIRATION_MS
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    createdAt: 0,
  }),

  getters: {
    count: (s) => s.items.reduce((acc, i) => acc + i.qty, 0),
  },

  actions: {
    addItem(name: string, measure?: string) {
      const key = `${name}::${measure ?? ''}`.toLowerCase()
      const found = this.items.find((i) => `${i.name}::${i.measure ?? ''}`.toLowerCase() === key)

      if (found) {
        found.qty += 1
      } else {
        this.items.push({ name, measure, qty: 1 })
      }

      if (!this.createdAt) {
        this.createdAt = Date.now()
      }

      this.saveToStorage()
    },

    removeItem(name: string, measure?: string) {
      const key = `${name}::${measure ?? ''}`.toLowerCase()
      this.items = this.items
        .map((i) => {
          const match = `${i.name}::${i.measure ?? ''}`.toLowerCase() === key
          return match ? { ...i, qty: i.qty - 1 } : i
        })
        .filter((i) => i.qty > 0)
      this.saveToStorage()
    },

    deleteItem(name: string, measure?: string) {
      const key = `${name}::${measure ?? ''}`.toLowerCase()
      this.items = this.items.filter((i) => `${i.name}::${i.measure ?? ''}`.toLowerCase() !== key)
      this.saveToStorage()
    },

    clear() {
      this.items = []
      this.createdAt = 0
      localStorage.removeItem(STORAGE_KEY)
    },

    saveToStorage() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: this.items,
          createdAt: this.createdAt,
        }),
      )
    },

    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      try {
        const parsed = JSON.parse(raw)
        const age = Date.now() - parsed.createdAt

        if (age < EXPIRATION_MS) {
          this.items = parsed.items
          this.createdAt = parsed.createdAt
        } else {
          // Too old, discard
          this.clear()
        }
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    },
  },
})
