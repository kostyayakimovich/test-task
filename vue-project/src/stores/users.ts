import { defineStore } from 'pinia'
import { getUsers } from '@/api'
import type { User } from '@/models'

export type UserState = {
  usersData: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    usersData: []
  }),

  actions: {
    async setUserData(value: string) {
      console.log(value, 'I am param')

      try {
        const result = await getUsers()
        if (result) this.usersData = result
      } catch (error) {
        console.error(error)
      }
    },
    addNewUser(user: User) {
      this.usersData = [...this.usersData, user]
    }
  },

  getters: {
    users: ({ usersData }) => usersData,
    getUser:
      ({ usersData }) =>
      (index: number) => {
        return usersData[index]
      }
  }
})
