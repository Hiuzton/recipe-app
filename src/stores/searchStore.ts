import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '' as string,
  }),
  actions: {
    setQuery(value: string) {
      this.query = value
    },
  },
})
