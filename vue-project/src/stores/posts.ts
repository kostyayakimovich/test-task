import { defineStore } from 'pinia'
import { getPosts } from '@/api'
import type { Post } from '@/models'
import { filterPosts } from '@/utils'

export type PostState = {
  postData: Post[]
}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    postData: []
  }),

  actions: {
    async setPostData() {
      try {
        const result = await getPosts()
        if (result) this.postData = filterPosts(result)
      } catch (error) {
        console.error(error)
      }
    }
  },

  getters: {
    posts: ({ postData }) => postData
  }
})
